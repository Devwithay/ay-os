import { createContext, useContext, useMemo } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';
import { missionPlan } from '../data/plan';

const GrowthContext = createContext(null);

export function GrowthProvider({ children }) {
  const [completedTasks, setCompletedTasks] = useLocalStorage(
    'ay-os-completed-tasks',
    []
  );

  const [dailyReviews, setDailyReviews] = useLocalStorage(
    'ay-os-daily-reviews',
    {}
  );

  const [skillProgress, setSkillProgress] = useLocalStorage(
    'ay-os-skill-progress',
    {}
  );

  const [forexProgress, setForexProgress] = useLocalStorage(
    'ay-os-forex-progress',
    {}
  );

  const [gadgetProducts, setGadgetProducts] = useLocalStorage(
    'ay-os-gadget-products',
    []
  );

  const [tradingJournal, setTradingJournal] = useLocalStorage(
    'ay-os-trading-journal',
    []
  );

  const [brainDump, setBrainDump] = useLocalStorage(
    'ay-os-brain-dump',
    []
  );

  const [currentDay, setCurrentDay] = useLocalStorage(
    'ay-os-current-day',
    1
  );

  const [vendors, setVendors] = useLocalStorage(
    'ay-os-vendors',
    []
  );

  const [experiments, setExperiments] = useLocalStorage(
    'ay-os-experiments',
    []
  );

  // -----------------------------
  // MISSION
  // -----------------------------

  const toggleTask = (taskId) => {
    setCompletedTasks((previousTasks) => {
      if (previousTasks.includes(taskId)) {
        return previousTasks.filter((id) => id !== taskId);
      }

      return [...previousTasks, taskId];
    });
  };

  const isTaskCompleted = (taskId) => {
    return completedTasks.includes(taskId);
  };

  const getDayProgress = (tasks = [], dayNumber = currentDay) => {
    if (tasks.length === 0) return 0;

    const completedCount = tasks.filter((_, index) => {
      const taskId = `day-${dayNumber}-task-${index + 1}`;
      return completedTasks.includes(taskId);
    }).length;

    return Math.round((completedCount / tasks.length) * 100);
  };

  const isDayCompleted = (day) => {
    if (!day || !day.tasks) return false;

    return getDayProgress(day.tasks, day.day) === 100;
  };

  const isDayUnlocked = (day) => {
    if (day <= currentDay) {
      return true;
    }

    const previousDay = missionPlan.find(
      (mission) => mission.day === day - 1
    );

    return previousDay ? isDayCompleted(previousDay) : false;
  };

  const completeCurrentDay = () => {
    const mission = missionPlan.find(
      (item) => item.day === currentDay
    );

    if (!mission) return;

    // Test days must be completed through the test component.
    if (mission.type === 'test') {
      return;
    }

    if (!isDayCompleted(mission)) {
      return;
    }

    setCurrentDay((day) => Math.min(day + 1, 30));
  };

  const completeTestDay = () => {
    const mission = missionPlan.find(
      (item) => item.day === currentDay
    );

    if (!mission || mission.type !== 'test') {
      return;
    }

    setCurrentDay((day) => Math.min(day + 1, 30));
  };

  // -----------------------------
  // DAILY REVIEWS
  // -----------------------------

  const saveDailyReview = (day, review) => {
    setDailyReviews((previous) => ({
      ...previous,
      [day]: {
        ...previous[day],
        ...review,
        updatedAt: new Date().toISOString(),
      },
    }));
  };

  const getDailyReview = (day) => {
    return (
      dailyReviews[day] || {
        wins: '',
        lessons: '',
        blockers: '',
        tomorrow: '',
      }
    );
  };

  // -----------------------------
  // BRAIN DUMP
  // -----------------------------

  const addBrainDump = (text) => {
    const trimmedText = text.trim();

    if (!trimmedText) return;

    setBrainDump((previous) => [
      {
        id: crypto.randomUUID(),
        text: trimmedText,
        createdAt: new Date().toISOString(),
      },
      ...previous,
    ]);
  };

  const deleteBrainDump = (id) => {
    setBrainDump((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  // -----------------------------
  // GAINLY VENDORS
  // -----------------------------

  const addVendor = (vendor) => {
    setVendors((previous) => [
      {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...vendor,
      },
      ...previous,
    ]);
  };

  const updateVendor = (id, updates) => {
    setVendors((previous) =>
      previous.map((vendor) =>
        vendor.id === id
          ? { ...vendor, ...updates }
          : vendor
      )
    );
  };

  const deleteVendor = (id) => {
    setVendors((previous) =>
      previous.filter((vendor) => vendor.id !== id)
    );
  };

  // -----------------------------
  // GAINLY EXPERIMENTS
  // -----------------------------

  const addExperiment = (experiment) => {
    setExperiments((previous) => [
      {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...experiment,
      },
      ...previous,
    ]);
  };

  const updateExperiment = (id, updates) => {
    setExperiments((previous) =>
      previous.map((experiment) =>
        experiment.id === id
          ? { ...experiment, ...updates }
          : experiment
      )
    );
  };

  const deleteExperiment = (id) => {
    setExperiments((previous) =>
      previous.filter((experiment) => experiment.id !== id)
    );
  };

  // -----------------------------
  // FOREX
  // -----------------------------

  const toggleForexLesson = (lessonId) => {
    setForexProgress((current) => ({
      ...current,
      [lessonId]: !current[lessonId],
    }));
  };

  // -----------------------------
  // TRADING JOURNAL
  // -----------------------------

  const addTrade = (trade) => {
    setTradingJournal((current) => [
      {
        ...trade,
        id: Date.now(),
      },
      ...current,
    ]);
  };

  const updateTrade = (id, updates) => {
    setTradingJournal((current) =>
      current.map((trade) =>
        trade.id === id
          ? { ...trade, ...updates }
          : trade
      )
    );
  };

  const deleteTrade = (id) => {
    setTradingJournal((current) =>
      current.filter((trade) => trade.id !== id)
    );
  };

  // -----------------------------
  // SKILLS
  // -----------------------------

  const toggleSkill = (skillId) => {
    setSkillProgress((current) => ({
      ...current,
      [skillId]: !current[skillId],
    }));
  };

  // -----------------------------
  // GADGETS
  // -----------------------------

  const addGadgetProduct = (product) => {
    setGadgetProducts((current) => [
      {
        ...product,
        id: Date.now(),
      },
      ...current,
    ]);
  };

  const deleteGadgetProduct = (id) => {
    setGadgetProducts((current) =>
      current.filter((product) => product.id !== id)
    );
  };

  // -----------------------------
  // DATA / SETTINGS
  // -----------------------------

  const totalCompletedTasks = completedTasks.length;

  const getAYOSData = () => ({
    completedTasks,
    currentDay,
    dailyReviews,
    brainDump,
    vendors,
    experiments,
    forexProgress,
    tradingJournal,
    skillProgress,
    gadgetProducts,
  });

  const resetAYOS = () => {
    const confirmed = window.confirm(
      'Reset AY OS? This will delete your saved progress, vendors, experiments, reviews and journal data.'
    );

    if (!confirmed) return;

    localStorage.clear();
    window.location.reload();
  };

  // -----------------------------
  // CONTEXT VALUE
  // -----------------------------

  const value = useMemo(
    () => ({
      // Mission
      completedTasks,
      currentDay,
      setCurrentDay,
      toggleTask,
      isTaskCompleted,
      getDayProgress,
      isDayCompleted,
      isDayUnlocked,
      completeCurrentDay,
      completeTestDay,
      totalCompletedTasks,

      // Reviews
      dailyReviews,
      saveDailyReview,
      getDailyReview,

      // Brain dump
      brainDump,
      addBrainDump,
      deleteBrainDump,

      // Gainly vendors
      vendors,
      addVendor,
      updateVendor,
      deleteVendor,

      // Gainly experiments
      experiments,
      addExperiment,
      updateExperiment,
      deleteExperiment,

      // Forex
      forexProgress,
      toggleForexLesson,

      // Trading journal
      tradingJournal,
      addTrade,
      updateTrade,
      deleteTrade,

      // Skills
      skillProgress,
      toggleSkill,

      // Gadgets
      gadgetProducts,
      addGadgetProduct,
      deleteGadgetProduct,

      // Settings
      getAYOSData,
      resetAYOS,
    }),
    [
      completedTasks,
      currentDay,
      dailyReviews,
      brainDump,
      vendors,
      experiments,
      forexProgress,
      tradingJournal,
      skillProgress,
      gadgetProducts,
      totalCompletedTasks,
    ]
  );

  return (
    <GrowthContext.Provider value={value}>
      {children}
    </GrowthContext.Provider>
  );
}

export function useGrowth() {
  const context = useContext(GrowthContext);

  if (!context) {
    throw new Error(
      'useGrowth must be used inside GrowthProvider'
    );
  }

  return context;
}