const mockData = [
  { round: 22, date: "22th Sept 9AM", total: 15, winning: 0, prize: "$0" },
  { round: 19, date: "22th Sept 9AM", total: 15, winning: 1, prize: "$43.22" },
  {
    round: 3,
    date: "19th Sept 9AM",
    total: 100,
    winning: 60,
    prize: "$4392.22",
  },
];

export const YourHistory = () => {
  return (
    <div className="rounded-[16px] bg-yuzu-cream p-8">
      <div className="color-[#102C24] font-semibold text-[16px] ">Rounds</div>
      <div className="mt-3">
        <div className="grid grid-cols-5 text-[#00000080] text-[14px] mb-2">
          <div className="font-normal">#</div>
          <div className="font-normal">Date</div>
          <div className="font-normal">Total Tickets</div>
          <div className="font-normal">Winning Tickets</div>
          <div className="font-normal text-right">Prize Won</div>
        </div>

        {mockData.map((item) => (
          <div
            key={item.round}
            className="grid grid-cols-5 text-[#000] text-[14px] mb-2 items-center"
          >
            <div className="font-medium">{item.round}</div>
            <div className="font-medium">{item.date}</div>
            <div className="font-medium">{item.total}</div>
            <div className="font-medium">{item.winning}</div>
            <div className="font-medium text-right">{item.prize}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
