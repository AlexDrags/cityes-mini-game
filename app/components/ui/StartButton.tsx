interface ButtonProps {
  onClick: (prev: boolean) => void;
  mode: boolean;
}
export default function StartButton({ onClick, mode }: ButtonProps) {
  return (
    <button
      className='min-w-max w-32 h-10 justify-center items-center gap-2.5 inline-flex x-4 py-2 bg-violet-600 rounded text-white text-base font-medium self-center hover:bg-slate-400 hover:text-black'
      type='button'
      onClick={() => {
        onClick(!mode);
      }}
    >
      Начать игру
    </button>
  );
}
