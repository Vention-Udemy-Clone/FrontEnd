export const Message = ({ owner }: { owner: boolean }) => {
  return (
    <div className={`flex items-end gap-3 ${owner ? "flex-row-reverse" : "flex-row"}`}>
      <div
        className={`${
          owner
            ? "w-[85%] max-w-[650px] rounded-l-lg rounded-t-lg bg-primary text-white"
            : "w-full  max-w-[900px] rounded-r-lg rounded-t-lg bg-muted"
        }  overflow-hidden break-words px-4 py-2`}
      >
        <p>Hello there! How are you? sdfnkdsfnkds nsdkfnksfnkdsnflkds dslkn flkdsn flksnd lkfs</p>
      </div>
    </div>
  );
};
