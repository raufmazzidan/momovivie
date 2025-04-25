function PageNotFound() {
  return (
    <div className="flex items-center justify-center flex-col h-screen gap-4">
      <div className="flex items-center justify-center gap-4">
        <p className="text-4xl font-medium text-pink-500">404</p>
        <div className="h-10 min-w-[1px] bg-zinc-500" />
        <p>Page Not Found</p>
      </div>
    </div>
  );
}

export default PageNotFound;
