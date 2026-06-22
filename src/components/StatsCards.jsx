import {
  GraduationCap,
  Trophy,
  BookOpen,
  Award,
} from "lucide-react";

function StatsCards({
  gpa,
  cgpa,
  totalUnits,
  classification,
}) {
  const cards = [
    {
      title: "Semester GPA",
      value: gpa,
      icon: GraduationCap,
      gradient:
        "from-indigo-500 to-indigo-700",
    },
    {
      title: "CGPA",
      value: cgpa,
      icon: Trophy,
      gradient:
        "from-green-500 to-green-700",
    },
    {
      title: "Total Units",
      value: totalUnits,
      icon: BookOpen,
      gradient:
        "from-purple-500 to-purple-700",
    },
    {
      title: "Classification",
      value: classification,
      icon: Award,
      gradient:
        "from-orange-500 to-orange-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`
              bg-gradient-to-r
              ${card.gradient}
              text-white
              p-6
              rounded-2xl
              shadow-lg
              hover:shadow-2xl
              hover:-translate-y-1
              transition-all
              duration-300
            `}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm opacity-80">
                  {card.title}
                </h3>

                <p className="text-3xl font-bold mt-2">
                  {card.value}
                </p>
              </div>

              <Icon
                size={32}
                className="opacity-80"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StatsCards;