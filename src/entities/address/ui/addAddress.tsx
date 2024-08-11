import React, { useState, useEffect, useCallback, useRef } from "react";
import { GoogleMap, LoadScript, Polygon } from "@react-google-maps/api";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { IMAGES } from "@shared/assets/images";
import { Alert, Box, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getDeliveryZones } from "@entities/login";
import {
  useCreateAddressMutation,
  useReverseGeocodeMutation,
} from "../model/addressApi";
import {
  getAddressCoordinates,
  getInputAddress,
  setInputAddress,
} from "../model/addressSlice";
import { useNavigate } from "react-router-dom";
import { YandexAutocomplete } from "./yandexAutoComplete";

const LocateButton = styled(IconButton)({
  position: "absolute",
  bottom: 100,
  right: 10,
  backgroundColor: "white",
  borderRadius: "50%",
  padding: "10px",
  boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
  cursor: "pointer",
  zIndex: 1000,
});

const MarkerButton = styled(IconButton)({
  position: "absolute",
  bottom: "50%",
  left: "50%",
  transform: "translate(-50%, 0%)",
  padding: "10px",
  cursor: "pointer",
  zIndex: 1000,
});

const AddAddressButton = styled(Button)({
  position: "absolute",
  bottom: 20,
  left: 20,
  right: 20,
  backgroundColor: "#13bbff",
  color: "white",
  padding: "10px 20px",
  borderRadius: 15,
  zIndex: 1000,
  boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
});

interface Position {
  lat: number;
  lng: number;
}

export const AddAddress: React.FC = () => {
  const markerPosition = useRef<Position>({ lat: -3.745, lng: -38.523 });
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const deliveryZones = useSelector(getDeliveryZones);
  const [reverseGeocode, { data }] = useReverseGeocodeMutation();
  const [createAddress, { data: createAddressData }] =
    useCreateAddressMutation();
  const [processed, setProcessed] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const inputAddress = useSelector(getInputAddress);
  const addressCoordinates = useSelector(getAddressCoordinates);

  useEffect(() => {
    const handleResize = () => {
      const viewportHeight = window!.visualViewport!.height;
      const isKeyboardVisible = viewportHeight < window.innerHeight;

      if (isKeyboardVisible) {
        document.querySelector(
          "body"
        )!.style.transform = `translateY(-${200}px)`;
      } else {
        document.querySelector("body")!.style.transform = "translateY(0)";
      }
    };

    window.visualViewport!.addEventListener("resize", handleResize);
    return () => {
      window.visualViewport!.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (addressCoordinates?.lat && addressCoordinates.lng) {
      markerPosition.current = {
        lat: addressCoordinates.lat,
        lng: addressCoordinates.lng,
      };
      console.log(addressCoordinates);
      map?.panTo(markerPosition.current);
    }
  }, [addressCoordinates]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mapContainerStyle = {
    height: "100vh",
    width: "100%",
  };

  const locateUser = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const newPosition = {
        lat: latitude,
        lng: longitude,
      };
      markerPosition.current = newPosition;
      if (map) {
        map.panTo(newPosition);
        map.setZoom(15);
      }
    });
  };

  const onLoad = (mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  };

  const handleClickAddAddress = async () => {
    await reverseGeocode({
      lat: markerPosition.current.lat,
      lng: markerPosition.current.lng,
    });
    setProcessed(true);
  };

  const validateFields = () => {
    const newErrors: { [key: string]: boolean } = {};
    if (!inputAddress.city) newErrors.city = true;
    if (!inputAddress.street) newErrors.street = true;
    if (!inputAddress.dom) newErrors.dom = true;
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleCreateAddress = () => {
    if (validateFields()) {
      createAddress(inputAddress);
      setOpen(false);
    }
  };

  useEffect(() => {
    if (data?.district_id) {
      dispatch(
        setInputAddress({
          ...data.address,
          location: { ...markerPosition.current },
        })
      );
      setOpen(true);
    }
  }, [data, markerPosition, dispatch]);

  useEffect(() => {
    if (createAddressData?.id) {
      setSuccessOpen(true);
      setTimeout(() => {
        navigate("/cart/order-form");
      }, 2000);
    }
  }, [createAddressData]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCenterChanged = useCallback(() => {
    if (map) {
      const newCenter = map.getCenter();
      if (newCenter) {
        markerPosition.current = {
          lat: newCenter.lat(),
          lng: newCenter.lng(),
        };
      }
    }
  }, [map]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyDShGBZtnRo7QwsMZqCJCs3L2-cXhteWYY">
      <div style={{ position: "relative" }}>
        <Box sx={{ position: "absolute", top: 0, left: 0, right: 0 }}>
          <YandexAutocomplete />
        </Box>
        <Snackbar
          open={processed && !data?.district_id}
          autoHideDuration={4000}
          sx={{ zIndex: 90999 }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setProcessed(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            Доставка по указанному адресу не осуществляется.
          </Alert>
        </Snackbar>
        <Snackbar
          open={successOpen}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{ zIndex: 90999 }}
        >
          <Alert
            onClose={() => setSuccessOpen(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Адрес успешно добавлен!
          </Alert>
        </Snackbar>
        <MarkerButton>
          <img
            src={IMAGES.marker}
            alt="Locate"
            style={{ width: "48px", height: "48px" }}
          />
        </MarkerButton>
        <GoogleMap
          options={{
            mapTypeControl: false,
            fullscreenControl: false,
            streetViewControl: false,
            zoomControl: false,
          }}
          mapContainerStyle={mapContainerStyle}
          center={markerPosition.current}
          zoom={10}
          onLoad={onLoad}
          onDragEnd={handleCenterChanged}
          onCenterChanged={handleCenterChanged}
        >
          {deliveryZones.map((polygon, index) => (
            <Polygon
              key={index}
              paths={polygon.map((point) => ({
                lat: point.latitude,
                lng: point.longitude,
              }))}
              options={{
                fillColor: "blue",
                fillOpacity: 0.2,
                strokeColor: "blue",
                strokeOpacity: 0.5,
                strokeWeight: 2,
                clickable: false,
                editable: false,
              }}
            />
          ))}
        </GoogleMap>
        <LocateButton onClick={locateUser}>
          <img
            src={IMAGES.navigation}
            alt="Locate"
            style={{ width: "24px", height: "24px" }}
          />
        </LocateButton>
        <AddAddressButton variant="contained" onClick={handleClickAddAddress}>
          Добавить адрес
        </AddAddressButton>
        <Dialog open={open} onClose={handleClose} sx={{ zIndex: 99999 }}>
          <DialogTitle>Добавить адрес</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Город"
              fullWidth
              value={inputAddress.city}
              error={errors.city || false}
              helperText={errors.city ? "Поле не должно быть пустым" : ""}
              onChange={(e) => {
                dispatch(setInputAddress({ city: e.target.value }));
              }}
            />
            <TextField
              value={inputAddress.street}
              margin="dense"
              label="Улица"
              fullWidth
              error={errors.street || false}
              helperText={errors.street ? "Поле не должно быть пустым" : ""}
              onChange={(e) => {
                dispatch(setInputAddress({ street: e.target.value }));
              }}
            />
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <TextField
                value={inputAddress.dom}
                onChange={(e) => {
                  dispatch(setInputAddress({ dom: e.target.value }));
                }}
                margin="dense"
                sx={{ mr: 1 }}
                label="Дом"
                fullWidth
                error={errors.dom || false}
                helperText={errors.dom ? "Поле не должно быть пустым" : ""}
              />
              <TextField margin="dense" label="Квартира" fullWidth />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <TextField
                margin="dense"
                sx={{ mr: 1 }}
                label="Подъезд"
                fullWidth
                onChange={(e) => {
                  dispatch(setInputAddress({ entrance: e.target.value }));
                }}
              />
              <TextField
                margin="dense"
                sx={{ mr: 1 }}
                label="Этаж"
                fullWidth
                onChange={(e) => {
                  dispatch(setInputAddress({ floor: e.target.value }));
                }}
              />
              <TextField
                margin="dense"
                label="Корпус"
                fullWidth
                onChange={(e) => {
                  dispatch(setInputAddress({ korp: e.target.value }));
                }}
              />
            </Box>
            <TextField
              margin="dense"
              label="Комментарий"
              fullWidth
              multiline
              rows={2}
              onChange={(e) => {
                dispatch(setInputAddress({ client_comment: e.target.value }));
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Отмена
            </Button>
            <Button onClick={handleCreateAddress} color="primary">
              Сохранить
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </LoadScript>
  );
};
