import React, { useState, useEffect } from "react";
import { TextField, List, ListItemText, ListItemButton, CircularProgress, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { YandexSuggest } from "../model/types";
import { useGetYandexGeocodeMutation, useGetYandexSuggestionsMutation } from "../model/addressApi";
import { setAddressCoordinates } from "../model/addressSlice";
import { useDispatch } from "react-redux";


const SuggestionList = styled(List)({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  backgroundColor: "#fff",
  borderRadius: "4px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  zIndex: 1000,
  maxHeight: "400px",
  overflowY: "auto", 
});

const LoadingSpinner = styled(CircularProgress)({
  position: "absolute",
  top: "50%",
  right: "10px",
  transform: "translateY(-50%)",
});

export const YandexAutocomplete: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<YandexSuggest[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [getYandexSuggestions] = useGetYandexSuggestionsMutation();
  const [getYandexGeocode] = useGetYandexGeocodeMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (query.length > 2) {
      fetchSuggestions(query);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const fetchSuggestions = async (query: string) => {
    setLoading(true);
    try {
      const response = await getYandexSuggestions(query);
      if (response.data?.results) setSuggestions(response.data?.results);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (ya: YandexSuggest) => {
    const text = ya.title.text + (ya.subtitle?.text || "");
    try {
      const res = await getYandexGeocode(text);
      if (res.data) {
        const [longitude, latitude] = res.data.featureMember[0].GeoObject.Point.pos.split(" ");
        dispatch(
          setAddressCoordinates({
            lat: +latitude,
            lng: +longitude,
          })
        );
        setQuery(text);
        setSuggestions(null);
      }
    } catch (error) {
      console.error("Error fetching geocode:", error);
    }
  };

  return (
    <Box sx={{ position: "relative", zIndex: 4343, backgroundColor: "red" }}>
      <TextField
        sx={{ backgroundColor: "#FFF" }}
        fullWidth
        variant="outlined"
        placeholder="Введите адрес"
        value={query}
        onChange={e => setQuery(e.target.value)}
        InputProps={{
          endAdornment: loading && <LoadingSpinner size={20} />,
        }}
      />
      {!!suggestions?.length && (
        <SuggestionList>
          {suggestions.map((item, index) => (
            <ListItemButton key={index} onClick={() => handleSelect(item)}>
              <ListItemText
                primary={item.title.text}
                secondary={item.subtitle?.text}
                primaryTypographyProps={{ variant: "body1" }}
                secondaryTypographyProps={{ variant: "body2", color: "textSecondary" }}
              />
            </ListItemButton>
          ))}
        </SuggestionList>
      )}
    </Box>
  );
};
