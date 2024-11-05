import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Privacy = () => {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <Card
        bordered={false}
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Title level={2}>Privacy Policy for Asuna</Title>
        <Paragraph>
          This privacy policy will explain how our organization uses the personal data we collect from you when you use Asuna, our Discord bot.
        </Paragraph>

        <Title level={4}>What data do we collect?</Title>
        <Paragraph>
          Asuna collects the following data:
        </Paragraph>
        <ul>
          <li>User ID</li>
          <li>Usernames</li>
          <li>Server ID</li>
          <li>Messages sent to the bot in direct messages or mentioned in a server (only while performing a command)</li>
        </ul>

        <Title level={4}>How do we collect your data?</Title>
        <Paragraph>
          You directly provide Asuna with most of the data we collect. We collect data and process data when you:
        </Paragraph>
        <ul>
          <li>Interact with the bot through commands</li>
          <li>Use or view our bot via your browser’s cookies</li>
        </ul>

        <Title level={4}>How will we use your data?</Title>
        <Paragraph>
          Asuna collects your data so that we can:
        </Paragraph>
        <ul>
          <li>Operate the bot and provide functionality</li>
          <li>Understand how users interact with the bot</li>
          <li>Make improvements based on user feedback and usage</li>
        </ul>

        <Title level={4}>How do we store your data?</Title>
        <Paragraph>
          Asuna securely stores your data at Hetzner using encrypted SQL. Asuna will keep your data for 30 Days (or more depending on the use). Once this time period has expired, we will delete your data.
        </Paragraph>

        <Title level={4}>What are your data protection rights?</Title>
        <Paragraph>
          We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
        </Paragraph>
        <ul>
          <li>The right to access – You have the right to request from Asuna copies of your personal data.</li>
          <li>The right to rectification – You have the right to request that Asuna correct any information you believe is inaccurate. You also have the right to request Asuna to complete the information you believe is incomplete.</li>
          <li>The right to erasure – You have the right to request that Asuna erase your personal data.</li>
          <li>The right to restrict processing – You have the right to request that Asuna restrict the processing of your personal data.</li>
        </ul>
        <Paragraph>
          If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us at our email: <a href="mailto:mjssdn95@gmail.com">mjssdn95@gmail.com</a>.
        </Paragraph>

        <Title level={4}>Changes to our privacy policy</Title>
        <Paragraph>
          Asuna keeps its privacy policy under regular review and places any updates on this web page. This privacy policy was last updated on 11.05.2024.
        </Paragraph>

        <Title level={4}>How to contact us</Title>
        <Paragraph>
          If you have any questions about Asuna's privacy policy, the data we hold on you, or you would like to exercise one of your data protection rights, please do not hesitate to contact us at our email: <a href="mailto:mjssdn95@gmail.com">mjssdn95@gmail.com</a>.
        </Paragraph>

        <Title level={4}>How to contact the appropriate authority</Title>
        <Paragraph>
          Should you wish to report a complaint or if you feel that Asuna has not addressed your concern in a satisfactory manner, you may contact the Information Commissioner’s Office (or your local data protection authority).
        </Paragraph>
      </Card>
    </div>
  );
};

export default Privacy;
