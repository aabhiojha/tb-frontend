const LoadingSine = () => {
  const dots = Array.from({ length: 5 });

  return (
    <div className="m-auto flex justify-center items-center gap-2">
      {dots.map((_, i) => (
        <div
          key={i}
          className="w-[20px] h-[20px] bg-blue-300 rounded-full sine-wave"
          style={{ animationDelay: `${i * 0.2}s` }}
        ></div>
      ))}
    </div>
  );
};

export default LoadingSine;
