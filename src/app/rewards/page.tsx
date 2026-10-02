import {
  CircleDollarSign,
  Gift,
  Package,
  Radio,
  ShoppingBag,
  Ticket,
} from "lucide-react";

const rewards = [
  {
    icon: Ticket,
    title: "Match Ticket",
    desc: "Arsenal vs Chelsea",
    points: "5,000 pts",
  },
  {
    icon: Package,
    title: "Data Bundle",
    desc: "1GB • MTN",
    points: "2,000 pts",
  },
  {
    icon: ShoppingBag,
    title: "Merchandise",
    desc: "SportyFanz Jersey",
    points: "6,000 pts",
  },
  {
    icon: Gift,
    title: "Food Voucher",
    desc: "Football & Grill",
    points: "3,000 pts",
  },
  {
    icon: Radio,
    title: "Viewing Centre",
    desc: "10% Off",
    points: "1,500 pts",
  },
];

export default function RewardPage() {
  return (
    <div className="page">

      <div className="page-header">
        <div>
          <span>FAN REWARDS</span>

          <h1>Your Rewards</h1>

          <p>
            Your loyalty has value. Redeem what you've earned.
          </p>
        </div>
      </div>

      <div className="rewards-balance">

        <div>
          <span>AVAILABLE SPORTY POINTS</span>

          <strong>12,840</strong>

          <small>+420 this week</small>
        </div>

        <div className="balance-icon">
          <CircleDollarSign size={35} />
        </div>

      </div>

      <div className="rewards-tabs">
        <button className="active">
          Available
        </button>

        <button>
          My Rewards
        </button>

        <button>
          History
        </button>
      </div>

      <div className="reward-grid">

        {rewards.map((reward) => {

          const Icon = reward.icon;

          return (
            <div
              className="reward-card"
              key={reward.title}
            >

              <div className="reward-image">
                <Icon size={30} />
              </div>

              <div className="reward-info">

                <span>{reward.title}</span>

                <strong>{reward.desc}</strong>

                <small>{reward.points}</small>

              </div>

              <button>
                Redeem
              </button>

            </div>
          );
        })}

      </div>

    </div>
  );
}