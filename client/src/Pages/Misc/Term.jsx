import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Term = () => {
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
        <Title level={2}>Terms of Service for Asuna</Title>
        <Paragraph>
          By using Asuna, you are agreeing to be bound by the following terms and conditions ("Terms of Service").
        </Paragraph>

        <Title level={4}>Service Termination</Title>
        <Paragraph>
          We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including, without limitation, if you breach the Terms. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
        </Paragraph>

        <Title level={4}>Changes To The Service</Title>
        <Paragraph>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
        </Paragraph>

        <Title level={4}>Arbitration</Title>
        <Paragraph>
          In the event of any dispute, claim, question, or disagreement arising from or relating to the Terms of Service or the breach thereof, the parties hereto shall use their best efforts to settle such disputes, claims, questions, or disagreement. To this effect, they shall consult and negotiate with each other in good faith and, recognizing their mutual interests, attempt to reach a just and equitable solution satisfactory to both parties. If they do not reach such solution within a period of 60 days, then upon notice by either party to the other, disputes, claims, questions, or differences shall be finally settled by arbitration administered by the International Chamber of Commerce (ICC) in accordance with the provisions of its Arbitration Rules.
        </Paragraph>

        <Title level={4}>Contact Information</Title>
        <Paragraph>
          If you have any questions about these Terms, please contact us at <a href="mailto:mjssdn95@gmail.com">mjssdn95@gmail.com</a>.
        </Paragraph>

        <Paragraph italic={true}>
          This Terms of Service was last updated on 11.05.2024.
        </Paragraph>
      </Card>
    </div>
  );
};

export default Term;
