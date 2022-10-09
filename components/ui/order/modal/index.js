import useEthPrice from "@components/hooks/useEthPrice";
import { Modal, Button } from "@components/ui/common";
import { useEffect, useState } from "react";

const defaultOrder = {
  price: "",
  email: "",
  confirmationEmail: "",
};

const _createFormState = (isDisabled = false, message = "") => ({
  isDisabled,
  message,
});

const createFormState = ({ price, email, confirmationEmail }, hasAggredTOS) => {
  if (!price || Number(price) <= 0) {
    return _createFormState(true, "Price is invalid!");
  } else if (email.length != 0 && confirmationEmail.length === 0) {
    return _createFormState(true, "Repeat your email address!");
  } else if (email.length === 0 || confirmationEmail.length === 0) {
    return _createFormState(true, "Insert your email address!");
  } else if (email !== confirmationEmail) {
    return _createFormState(true, "Email does not match!");
  } else if (!hasAggredTOS) {
    return _createFormState(
      true,
      "You need to aggree with terms of service to submit the form!"
    );
  }

  return _createFormState();
};

const OrderModal = ({ course, onClose, onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState(defaultOrder);
  const [enablePrice, setEnablePrice] = useState(false);
  const [hasAggredTOS, setHasAggredTOS] = useState(false);
  const { eth } = useEthPrice();

  useEffect(() => {
    if (!!course) {
      setIsOpen(true);
      setOrder({
        ...defaultOrder,
        price: eth.perItem,
      });
    }
  }, [course]);

  const close = () => {
    setIsOpen(false);
    setOrder(defaultOrder);
    setEnablePrice(false);
    setHasAggredTOS(false);
    onClose();
  };

  const formState = createFormState(order, hasAggredTOS);

  return (
    <Modal isOpen={isOpen}>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="mb-7 text-lg font-bold leading-6 text-gray-900"
                id="modal-title"
              >
                {course.title}
              </h3>
              <div className="mt-1 relative rounded-md">
                <div className="mb-1">
                  <label className="mb-2 font-bold">Price(eth)</label>
                  <div className="text-xs text-gray-700 flex">
                    <label className="flex items-center mr-2">
                      <input
                        checked={enablePrice}
                        onChange={({ target: { checked } }) => {
                          setOrder({
                            ...order,
                            price: checked ? order.price : eth.perItem,
                          });
                          setEnablePrice(checked);
                        }}
                        type="checkbox"
                        className="form-checkbox"
                      />
                    </label>
                    <span>
                      Adjust Price - only when the price is not correct
                    </span>
                  </div>
                </div>
                <input
                  disabled={!enablePrice}
                  value={order.price}
                  onChange={({ target: { value } }) => {
                    if (isNaN(value)) {
                      return;
                    }
                    setOrder({
                      ...order,
                      price: value,
                    });
                  }}
                  type="text"
                  name="price"
                  id="price"
                  className="disabled:opacity-50 w-80 mb-1 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                />
                <p className="text-xs text-gray-700">
                  Price will be verified at the time of the order. If the price
                  will be lower, order can be declined (+- 2% slipage is
                  allowed)
                </p>
              </div>
              <div className="mt-2 relative rounded-md">
                <div className="mb-1">
                  <label className="mb-2 font-bold">Email</label>
                </div>
                <input
                  onChange={({ target: { value } }) => {
                    setOrder({
                      ...order,
                      email: value.trim(),
                    });
                  }}
                  value={order.email && order.email}
                  type="email"
                  name="email"
                  id="email"
                  className="w-80 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                  placeholder="x@y.com"
                />
                <p className="text-xs text-gray-700 mt-1">
                  It&apos;s important to fill a correct email, otherwise the
                  order cannot be verified. We are not storing your email
                  anywhere
                </p>
              </div>
              <div className="my-2 relative rounded-md">
                <div className="mb-1">
                  <label className="mb-2 font-bold">Repeat Email</label>
                </div>
                <input
                  onChange={({ target: { value } }) => {
                    setOrder({
                      ...order,
                      confirmationEmail: value.trim(),
                    });
                  }}
                  value={order.confirmationEmail && order.confirmationEmail}
                  type="email"
                  name="confirmationEmail"
                  id="confirmationEmail"
                  className="w-80 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                  placeholder="x@y.com"
                />
              </div>
              <div className="text-xs text-gray-700 flex">
                <label className="flex items-center mr-2">
                  <input
                    checked={hasAggredTOS}
                    onChange={({ target: { checked } }) => {
                      setHasAggredTOS(checked);
                    }}
                    type="checkbox"
                    className="form-checkbox"
                  />
                </label>
                <span>
                  I accept Eincode &apos;terms of service&apos; and I agree that
                  my order can be rejected in the case data provided above are
                  not correct
                </span>
              </div>
              {formState.message && (
                <div className="p-4 my-3 rounded-lg text-sm text-red-700 bg-red-200">
                  {formState.message}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex">
          <Button
            disabled={formState.isDisabled}
            onClick={() => {
              onSubmit(order);
            }}
          >
            Submit
          </Button>
          <Button variant="red" onClick={close}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderModal;
