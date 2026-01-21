import StoreCard from './store-card';

export default function StoreGrid() {
  return (
    <div className="grid grid-cols-3 gap-6 mt-12">
      <StoreCard
        id="1"
        image="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
        tag="Premium"
        name="The Place Lagos"
        cuisine="Nigerian · Continental"
        rating={4.8}
        location="Victoria Island"
        delivery="Free"
        time="25–35 mins"
      />

      <StoreCard
        id="2"
        image="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe"
        tag="Popular"
        name="Nok by Alara"
        cuisine="Africa Fusion"
        rating={4.9}
        location="Victoria Island"
        delivery="₦500 delivery"
        time="30–40 mins"
      />

      <StoreCard
       id="3"
        image="https://images.unsplash.com/photo-1553621042-f6e147245754"
        tag="New"
        name="Ocean Basket"
        cuisine="Seafood"
        rating={4.7}
        location="Lekki"
        delivery="₦700 delivery"
        time="30–40 mins"
      />
    </div>
  );
}
