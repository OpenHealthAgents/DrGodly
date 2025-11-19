"use client";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageAction,
  MessageActions,
  MessageAttachment,
  MessageAttachments,
  MessageBranch,
  MessageBranchContent,
  MessageBranchNext,
  MessageBranchPage,
  MessageBranchPrevious,
  MessageBranchSelector,
  MessageContent,
  MessageResponse,
  MessageToolbar,
} from "@/components/ai-elements/message";
import { Avatar } from "@/components/ui/avatar";
import {
  Brain,
  CopyIcon,
  MessageSquareIcon,
  RefreshCcwIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

type TMessageItem = {
  key: string;
  from: "user" | "assistant";
  versions?: { id: string; content: string }[];
  content?: string;
  attachments?: {
    type: "file";
    url: string;
    mediaType: string;
    filename?: string;
  }[];
};

type TUser = {
  id: string;
  name: string;
  email: string;
  image: string | null | undefined;
};

const ConversationChat = ({
  messages,
  liveTranscript,
  liveRole,
  user,
}: {
  messages: TMessageItem[];
  liveTranscript: string;
  liveRole: "user" | "assistant" | null;
  user: TUser;
}) => {
  const [visibleMessages, setVisibleMessages] = useState<TMessageItem[]>([]);

  useEffect(() => {
    setVisibleMessages(messages);
  }, [messages]);

  return (
    <Conversation className="relative flex-1 pb-14">
      <ConversationContent>
        {visibleMessages.length === 0 && !liveTranscript ? (
          <ConversationEmptyState
            description="Messages will appear here as the conversation progresses."
            icon={<MessageSquareIcon className="size-6" />}
            title="Start the Call"
          />
        ) : (
          <>
            {visibleMessages.map((message) => (
              //   <Message from={message.from} key={message.key}>
              //     {message.versions && message.versions.length > 1 ? (
              //       <MessageBranch defaultBranch={0} key={message.key}>
              //         <MessageBranchContent>
              //           {message.versions.map((version) => (
              //             <MessageContent key={version.id}>
              //               <MessageResponse>{version.content}</MessageResponse>
              //             </MessageContent>
              //           ))}
              //         </MessageBranchContent>

              //         {message.from === "assistant" && (
              //           <MessageToolbar>
              //             <MessageBranchSelector from={message.from}>
              //               <MessageBranchPrevious />
              //               <MessageBranchPage />
              //               <MessageBranchNext />
              //             </MessageBranchSelector>

              //             <MessageActions>
              //               <MessageAction
              //                 label="Retry"
              //                 onClick={handleRetry}
              //                 tooltip="Regenerate response"
              //               >
              //                 <RefreshCcwIcon className="size-4" />
              //               </MessageAction>
              //               <MessageAction
              //                 label="Like"
              //                 onClick={() =>
              //                   setLiked((prev) => ({
              //                     ...prev,
              //                     [message.key]: !prev[message.key],
              //                   }))
              //                 }
              //                 tooltip="Like this response"
              //               >
              //                 <ThumbsUpIcon
              //                   className="size-4"
              //                   fill={
              //                     liked[message.key] ? "currentColor" : "none"
              //                   }
              //                 />
              //               </MessageAction>
              //               <MessageAction
              //                 label="Dislike"
              //                 onClick={() =>
              //                   setDisliked((prev) => ({
              //                     ...prev,
              //                     [message.key]: !prev[message.key],
              //                   }))
              //                 }
              //                 tooltip="Dislike this response"
              //               >
              //                 <ThumbsDownIcon
              //                   className="size-4"
              //                   fill={
              //                     disliked[message.key] ? "currentColor" : "none"
              //                   }
              //                 />
              //               </MessageAction>
              //               <MessageAction
              //                 label="Copy"
              //                 onClick={() =>
              //                   handleCopy(
              //                     message.versions?.find((v) => v.id)?.content ||
              //                       ""
              //                   )
              //                 }
              //                 tooltip="Copy to clipboard"
              //               >
              //                 <CopyIcon className="size-4" />
              //               </MessageAction>
              //             </MessageActions>
              //           </MessageToolbar>
              //         )}
              //       </MessageBranch>
              //     ) : (
              //       <div key={message.key}>
              //         {message.attachments && message.attachments.length > 0 && (
              //           <MessageAttachments className="mb-2">
              //             {message.attachments.map((attachment) => (
              //               <MessageAttachment
              //                 data={attachment}
              //                 key={attachment.url}
              //               />
              //             ))}
              //           </MessageAttachments>
              //         )}

              //         <MessageContent>
              //           {message.from === "assistant" ? (
              //             <MessageResponse>{message.content}</MessageResponse>
              //           ) : (
              //             message.content
              //           )}
              //         </MessageContent>

              //         {message.from === "assistant" && message.versions && (
              //           <MessageActions>
              //             <MessageAction
              //               label="Retry"
              //               onClick={handleRetry}
              //               tooltip="Regenerate response"
              //             >
              //               <RefreshCcwIcon className="size-4" />
              //             </MessageAction>
              //             <MessageAction
              //               label="Like"
              //               onClick={() =>
              //                 setLiked((prev) => ({
              //                   ...prev,
              //                   [message.key]: !prev[message.key],
              //                 }))
              //               }
              //               tooltip="Like this response"
              //             >
              //               <ThumbsUpIcon
              //                 className="size-4"
              //                 fill={liked[message.key] ? "currentColor" : "none"}
              //               />
              //             </MessageAction>
              //             <MessageAction
              //               label="Dislike"
              //               onClick={() =>
              //                 setDisliked((prev) => ({
              //                   ...prev,
              //                   [message.key]: !prev[message.key],
              //                 }))
              //               }
              //               tooltip="Dislike this response"
              //             >
              //               <ThumbsDownIcon
              //                 className="size-4"
              //                 fill={
              //                   disliked[message.key] ? "currentColor" : "none"
              //                 }
              //               />
              //             </MessageAction>
              //             <MessageAction
              //               label="Copy"
              //               onClick={() => handleCopy(message.content || "")}
              //               tooltip="Copy to clipboard"
              //             >
              //               <CopyIcon className="size-4" />
              //             </MessageAction>
              //           </MessageActions>
              //         )}
              //       </div>
              //     )}
              //   </Message>
              <Message key={message.key} from={message.from}>
                <MessageContent>
                  <div className="flex gap-2 items-center">
                    {message.from === "assistant" ? (
                      <div
                        className={`bg-secondary w-fit rounded-full p-2 mb-1`}
                      >
                        <Brain className="size-6" />
                      </div>
                    ) : (
                      //   <div className="bg-primary text-center flex items-center w-fit rounded-full p-2 mb-1">
                      //     <p className="text-2xl text-secondary size-6">
                      //       {user.name[0]}
                      //     </p>
                      //   </div>
                      <Avatar className="size-8">
                        <div className="flex items-center justify-center text-2xl size-6">
                          {user.name[0]}
                        </div>
                      </Avatar>
                    )}
                    <MessageResponse>{message.content}</MessageResponse>
                  </div>
                </MessageContent>
              </Message>
            ))}

            {/* Live partial transcript */}
            {liveTranscript && liveRole && (
              <Message from={liveRole} key="live-transcript">
                <div>
                  <MessageContent>
                    <MessageResponse>{liveTranscript}</MessageResponse>
                  </MessageContent>
                </div>
              </Message>
            )}
          </>
        )}
      </ConversationContent>

      <ConversationScrollButton />
    </Conversation>
  );
};

export default ConversationChat;
