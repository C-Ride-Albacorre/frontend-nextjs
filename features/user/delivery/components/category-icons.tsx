import {
  Donut,
  Drumstick,
  IceCreamCone,
  Pizza,
  Salad,
  Soup,
  Tag,
} from 'lucide-react';

const categories = [
  { name: 'Promotions', icon: <Tag /> },
  { name: 'Jollof', icon: <Soup /> },
  { name: 'Local Food', icon: <Salad /> },
  { name: 'Chicken', icon: <Drumstick /> },
  { name: 'Snacks', icon: <Donut /> },
  { name: 'Pizza', icon: <Pizza /> },
  { name: 'Ice Cream', icon: <IceCreamCone /> },
];

export default function CategoryIcons() {
  return (
    <section>
      <div className="flex flex-wrap gap-8 justify-between items-center">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="flex flex-col justify-center items-center"
          >
            <div className="w-14 h-14 rounded-full bg-primary hover:bg-primary-hover cursor-pointer flex items-center justify-center">
              {cat.icon}
            </div>
            <p className="mt-3 text-sm text-primary-text-100">{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
