import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useUpdateTimePeriodsMutation,
  useUpdateCommonParamsMutation,
  useConvertCartToOrderQuery,
  usePayOrderMutation,
  useMakeOrderMutation,
} from "../model/orderApi";
import { setFieldsToUpdateOrder } from "../model/orderSlice";
import {
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  SelectChangeEvent,
  Typography,
  Button,
  styled,
} from "@mui/material";
import { RootState } from "@app/store";
import { useGetAddressesQuery } from "@entities/address";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LoadingIndicator } from "@shared/ui/loadingIndicator";
import { PaymentMethodNames } from "../model/types";
import WebApp from "@twa-dev/sdk";
import { useNavigate } from "react-router-dom";

export const Checkout: React.FC = () => {
  useConvertCartToOrderQuery();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fieldsToUpdateOrder, orderDatePeriod, minDateForOrder, order } = useSelector(
    (state: RootState) => state.order
  );
  const { data: addresses, isLoading: isLoadingAddresses } = useGetAddressesQuery();
  const [updateTimePeriods, { isLoading: isUpdatingTimePeriods }] = useUpdateTimePeriodsMutation();
  const [updateCommonParams, { isLoading: isCommonParamsUpdating }] = useUpdateCommonParamsMutation();
  const [payOrder, { data }] = usePayOrderMutation();
  const [makeOrder, { data: makeOrderData }] = useMakeOrderMutation();

  const handleOrderCompletion = () => {
    WebApp.showPopup({
      title: "Заказ завершен",
      message: "Спасибо за ваш заказ!",
      buttons: [{ id: "ok", type: "default", text: "OK" }],
    });

    setTimeout(() => {
      WebApp.close();
    }, 2000);
  };

  useEffect(() => {
    if (makeOrderData?.message) {
      handleOrderCompletion();
    }
  }, [makeOrderData]);

  useEffect(() => {
    if (data?.redirect) {
      WebApp.openLink(data.redirect);
    }
  }, [data?.redirect]);

  useEffect(() => {
    if (order?.district_id) {
      updateTimePeriods({ district_id: order.district_id, date: new Date().toString() });
    }
  }, [order?.district_id, updateTimePeriods, dispatch]);

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    if (newValue) {
      const formattedDate = newValue.format("YYYY-MM-DD");
      dispatch(setFieldsToUpdateOrder({ date: formattedDate }));
      updateCommonParams({ ...fieldsToUpdateOrder, date: formattedDate });
    }
  };

  const handlePeriodChange = (event: SelectChangeEvent<string>) => {
    const selectedPeriod = orderDatePeriod?.periods.find(period => period.id === event.target.value);

    if (selectedPeriod) {
      dispatch(
        setFieldsToUpdateOrder({
          time_from: selectedPeriod.period[0],
          time_to: selectedPeriod.period[1],
        })
      );
      updateCommonParams({
        ...fieldsToUpdateOrder,
        time_from: selectedPeriod.period[0],
        time_to: selectedPeriod.period[1],
      });
    }
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedAddress = addresses?.find(address => address.id === event.target.value);
    if (selectedAddress) {
      dispatch(
        setFieldsToUpdateOrder({
          address_id: selectedAddress.id,
          address: { id: selectedAddress.id },
        })
      );
      updateCommonParams({
        ...fieldsToUpdateOrder,
        address_id: selectedAddress.id,
        address: { id: selectedAddress.id },
      });
    }
  };

  useEffect(() => {
    const firstPeriod = orderDatePeriod?.periods.at(0);

    if (firstPeriod) {
      dispatch(
        setFieldsToUpdateOrder({
          time_from: firstPeriod.period[0],
          time_to: firstPeriod.period[1],
        })
      );
    }
  }, [dispatch, orderDatePeriod]);

  const handlePayTypeChange = (e: SelectChangeEvent<string>) => {
    dispatch(
      setFieldsToUpdateOrder({
        pay_type_id: e.target.value,
      })
    );
    updateCommonParams({
      ...fieldsToUpdateOrder,
      pay_type_id: e.target.value,
    });
  };

  const isOnlinePayment = useMemo(() => {
    const payType = order?.pay_types_rich?.find(pt => pt.id === order.pay_type_id);

    return payType?.system_name === PaymentMethodNames.CARD || payType?.system_name === PaymentMethodNames.SBP;
  }, [order]);

  return (
    <Box sx={{ p: 2 }}>
      {(isCommonParamsUpdating || isUpdatingTimePeriods || isLoadingAddresses) && <LoadingIndicator />}
      <Box>
        <FormControl component="fieldset" fullWidth>
          <Typography>Выберите адрес</Typography>
          <RadioGroup value={fieldsToUpdateOrder.address_id} onChange={handleAddressChange}>
            {addresses?.map(address => (
              <FormControlLabel key={address.id} value={address.id} control={<Radio />} label={address.map_addr} />
            ))}
          </RadioGroup>
        </FormControl>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
          <Button onClick={() => navigate("/add-address")}>Добавить адрес</Button>
        </Box>
        {fieldsToUpdateOrder.address_id && (
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Выберите дату"
                  minDate={dayjs(minDateForOrder)}
                  value={dayjs(order?.date)}
                  onChange={handleDateChange}
                />
              </DemoContainer>
            </LocalizationProvider>
            {orderDatePeriod && (
              <FormControl fullWidth margin="normal">
                <InputLabel id="delivery-period-label">Выберите время</InputLabel>
                <Select
                  labelId="delivery-period-label"
                  value={`${fieldsToUpdateOrder.time_from} - ${fieldsToUpdateOrder.time_to}`}
                  onChange={handlePeriodChange}
                  label="Выберите время">
                  {orderDatePeriod.periods.map(period => (
                    <MenuItem key={period.id} value={period.id}>
                      {period.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <FormControl fullWidth margin="normal">
              <InputLabel id="delivery-period-label">Тип оплаты</InputLabel>
              <Select
                labelId="delivery-period-label"
                value={order?.pay_type_id}
                onChange={handlePayTypeChange}
                label="Тип оплаты">
                {order?.pay_types_rich.map(pt => (
                  <MenuItem key={pt.id} value={pt.id}>
                    {pt.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}
        {!!fieldsToUpdateOrder.address_id && (
          <OrderButton
            onClick={() => {
              isOnlinePayment ? payOrder() : makeOrder();
            }}>
            {isOnlinePayment ? "Оплатить" : "Оформить заказ"}
          </OrderButton>
        )}
      </Box>
    </Box>
  );
};

const OrderButton = styled(Button)({
  backgroundColor: "#13bbff",
  color: "#fff",
  border: "none",
  padding: "10px",
  fontSize: "16px",
  borderRadius: "30px",
  width: "100%",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#13bbff",
  },
  "&.disabled": {
    backgroundColor: "#c5c5c5",
    cursor: "not-allowed",
  },
});
