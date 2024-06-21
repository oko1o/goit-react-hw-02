import Description from '../Description/Description';
import Options from '../Options/Options';
import Feedback from '../Feedback/Feedback';
import Notification from '../Notification/Notification';
import { useEffect, useState } from 'react';

export default function App() {
  const getInitialOptionsState = () => {
    const initialOptionState = {
      good: 0,
      neutral: 0,
      bad: 0,
    };
    const savedOptions = localStorage.getItem('votedFeedback');
    if (savedOptions) {
      return Object.values(JSON.parse(savedOptions)).reduce(
        (acc, value) => acc + value,
        0
      ) !== 0
        ? JSON.parse(savedOptions)
        : initialOptionState;
    } else {
      return initialOptionState;
    }
  };

  const [option, setOption] = useState(getInitialOptionsState);

  const updateFeedback = (feedbackType) => {
    setOption({ ...option, [feedbackType]: option[feedbackType] + 1 });
  };

  const resetFeedback = () => {
    localStorage.removeItem('votedFeedback');
  };

  const totalFeedback = Object.values(option).reduce(
    (acc, value) => acc + value,
    0
  );

  const positiveFeedback = Math.round((option.good / totalFeedback) * 100);

  useEffect(() => {
    localStorage.setItem('votedFeedback', JSON.stringify(option));
  }, [option]);

  return (
    <>
      <Description />
      <Options
        onButtonClick={updateFeedback}
        totalVotes={totalFeedback}
        onResetButton={resetFeedback}
      />
      {totalFeedback !== 0 ? (
        <Feedback
          data={option}
          totalVotes={totalFeedback}
          positiveVotesPercent={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </>
  );
}
