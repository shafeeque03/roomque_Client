import { format } from 'timeago.js'
const OwnerConversation = ({ currentOwner, message }) => {
  return (
    <div id="messages" className="">
      {currentOwner === message.senderId ? (
        <div className="chat-message">
        <div className="flex items-end justify-end">
          <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
            <div>
              <span
                className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-green-600 text-sm text-white break-words"
                style={{ maxWidth: "350px" }}
              >
                {message?.text}
                <p
                  style={{ fontSize: "9px" }}
                  className="text-right text-slate-900"
                >
                  {new Date(message.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                  })}{" "}
                  {new Date(message.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-end text-slate-400 text-sm font-extralight">
          {message?.createdAt && <span></span>}
        </div>
      </div>
    ) : (
      <div className="chat-message">
        <div className="flex items-end">
          <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
            <div>
            <span
                className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-slate-300 text-sm text-slate-900 break-words"
                style={{ maxWidth: "350px" }}
              >
                {message?.text}
                <p
                  style={{ fontSize: "9px" }}
                  className="text-right text-slate-900"
                >
                  {new Date(message.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                  })}{" "}
                  {new Date(message.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  )
}

export default OwnerConversation
