const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-slate-100 flex items-center justify-center">
    { children }
    </div>

);
};
export default ClerkLayout