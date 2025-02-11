import React from "react";
import OrderHistory, {
  Order,
  ORDER_STATUS,
  PAYMENT_METHODS,
} from "../../containers/order-history/OrderHistory";
import ProfileCard from "../../containers/profile-card-page/ProfileCard";
import ReusableForm from "../../components/reusable-form/ReusableForm";
import './ProfilePage.css'

const ProfilePage: React.FC = () => {
  const orders: Order[] = [
    {
      id: "#123456789",
      date: "2 June 2023 2:40 PM",
      estimatedDelivery: "8 June 2023",
      status: ORDER_STATUS.PENDING,
      paymentMethod: PAYMENT_METHODS.CASH,
      items: [
        {
          image: "black_tshirt.jpg",
          name: "Black Printed T-shirt",
          color: "Pink",
          quantity: 1,
          total: 23.0,
        },
      ],
    },
    {
      id: "#987654321",
      date: "5 June 2023 4:30 PM",
      estimatedDelivery: "10 June 2023",
      status: ORDER_STATUS.CANCELLED,
      paymentMethod: PAYMENT_METHODS.CARD,
      items: [
        {
          image: "printed_cote.jpg",
          name: "Printed Blue & White Cote",
          color: "White",
          quantity: 1,
          total: 143.0,
        },
      ],
    },
    {
      id: "#564738291",
      date: "10 June 2023 1:15 PM",
      estimatedDelivery: "15 June 2023",
      status: ORDER_STATUS.COMPLETED,
      paymentMethod: PAYMENT_METHODS.ONLINE,
      items: [
        {
          image: "blue_shirt.jpg",
          name: "Blue Shirt",
          color: "Blue",
          quantity: 1,
          total: 93.0,
        },
      ],
    },
  ];

  return (
    <div className="profile-page">
      <ProfileCard
        name="Alexa Rawles"
        profilePicture="Blue_Cute_Dog.png"
        email="alexarawles@gmail.com"
      />
      <ReusableForm
        buttonName="Edit"
        isAgeVisible={true}
        onSubmit={function (values: any): void {
          throw new Error("Function not implemented.");
        }}
        isSignupPage={false}
      />
      <OrderHistory orders={orders} />
    </div>
  );
};

export default ProfilePage;
