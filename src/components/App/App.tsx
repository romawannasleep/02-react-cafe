import { useState } from "react";
import type { Votes, VoteType } from "../../types/votes";
import CafeInfo from "../CafeInfo/CafeInfo";
import Options from "../VoteOptions/VoteOptions";
import VoteStats from "../VoteStats/VoteStats";
import css from  './App.module.css';
import Notification from "../Notification/Notification";

const initialState: Votes = {
	good: 0,
	neutral: 0,
	bad: 0
};

export default function App() {
  const [votes, setVotes] = useState<Votes>(initialState);
  function handleVote (type:VoteType) {
    setVotes(prev => ({...prev, [type]:prev[type] + 1}));
  }
  function resetVotes() {
  setVotes(initialState);
}
const totalVotes = votes.good + votes.bad + votes.neutral
const positiveRate = totalVotes ? Math.round((votes.good / totalVotes) * 100): 0;
  return (
  <div className={css.app}>
   <CafeInfo />
   <Options onVote={handleVote} onReset={resetVotes} canReset={totalVotes > 0}/>
   {totalVotes > 0 ? <VoteStats votes={votes} totalVotes={totalVotes} positiveRate={positiveRate}/>: <Notification />}
  </div>)
};
