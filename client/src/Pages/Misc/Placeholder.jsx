import React from "react";
import { Button, Typography } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling

const { Title, Paragraph } = Typography;

const Placeholder = () => {
  const copyToClipboard = (text) => {
    if (!navigator.clipboard) {
      toast.error("Clipboard API not supported"); // Handle unsupported clipboard API
      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success(`${text} copied !`, {
          position: "top-center",
        }); // Use string for position
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast.error("Failed to copy text", { position: "top-center" }); // Use string for position
      });
  };

  const placeholders = [
    {
      title: "Bot placeholders",
      content: [
        "%bot.status% - Bot's status (Online, Idle, DoNotDisturb, Invisible)",
        "%bot.latency% - Bot latency",
        "%bot.name% - Bot username",
        "%bot.mention% - Bot mention (clickable)",
        "%bot.fullname% - Bot username#discriminator",
        "%bot.time% - Bot time (usually the time of the server it's hosted on)",
        "%bot.discrim% - Bot's discriminator",
        "%bot.id% - Bot's user ID",
        "%bot.avatar% - Bot's avatar url",
      ],
    },
    {
      title: "Server placeholders",
      content: [
        "%server.id% - Server ID",
        "%server.name% - Server name",
        "%server.members% - Member count",
        "%server.boosters% - Number of users boosting the server",
        "%server.boost_level% - Server Boost level",
        "%server.time% - Server time (requires .timezone to be set)",
      ],
    },
    {
      title: "Channel placeholders",
      content: [
        "%channel.mention% - Channel mention (clickable)",
        "%channel.name% - Channel name",
        "%channel.id% - Channel ID",
        "%channel.created% - Channel creation date",
        "%channel.nsfw% - Returns either True or False, depending on if the channel is designated as age-restricted in Discord",
        "%channel.topic% - Channel topic",
      ],
    },
    {
      title: "User placeholders",
      content: [
        "%user.mention% - User mention",
        "%user.fullname% - Username#discriminator",
        "%user.name% - Username",
        "%user.discrim% - Discriminator",
        "%user.avatar% - User's avatar url",
        "%user.id% - User ID",
        "%user.created_time% - Account creation time (local time)",
        "%user.created_date% - Account creation date",
        "%user.joined_time% - Account join time (local time)",
        "%user.joined_date% - Account join date",
      ],
    },
    {
      title: "Ban message placeholders",
      content: [
        "%ban.mod% - Full name of the moderator who performed the ban",
        "%ban.mod.fullname% - Full name of the moderator who performed the ban",
        "%ban.mod.mention% - Moderator's mention",
        "%ban.mod.name% - Name of the moderator - Admin",
        "%ban.mod.discrim% - Discriminator of the moderator - 1234",
        "%ban.user% - Full name of the banned user",
        "%ban.user.fullname% - Full name of the banned user",
        "%ban.user.name% - Name of the banned user",
        "%ban.user.discrim% - Discriminator of the banned user",
        "%ban.reason% - Reason for the ban, if provided",
        "%ban.duration% - Duration of the ban in the form Days.Hours:Minutes (6.05:04)",
      ],
    },
    {
      title: "Shard stats placeholders",
      content: [
        "%shard.servercount% - Server count on current shard",
        "%shard.usercount% - Combined user count on current shard",
        "%shard.id% - Shard ID",
      ],
    },
    {
      title: "Music placeholders",
      content: [
        "%music.queued% - Number of songs currently queued",
        "%music.playing% - Current song name (random playing song if bot is playing on multiple servers)",
        "%music.servers% - Number of servers currently listening to music",
      ],
    },
    {
      title: "Miscellaneous placeholders",
      content: [
        "%rngX-Y% - Returns a random number between X and Y",
        "%target% - Returns anything the user has written after the trigger (only works on Expressions)",
      ],
    },
  ];

  return (
    <div style={{ padding: "40px" , borderRadius: "10px" , boxShadow: "0 4px 8px rgba(0, 0, 0, 1)"}}>
      {placeholders.map((section, index) => (
        <div key={index} style={{ marginBottom: "24px" }}>
          <Title level={4} style={{ fontWeight: "bold", color: "white" }}>
            {section.title}
          </Title>
          {section.content.map((text, idx) => {
            const placeholderText = text.split(" - ")[0]; 
            return (
              <Paragraph
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "white",
                }}
              >
                <Button
                  type="primary"
                  icon={<CopyOutlined />}
                  size="small"
                  style={{ marginRight: "10px" }}
                  onClick={() => copyToClipboard(placeholderText)}
                ></Button>
                {text}
              </Paragraph>
            );
          })}
        </div>
      ))}
      <ToastContainer />
    </div>
  );
};

export default Placeholder;
