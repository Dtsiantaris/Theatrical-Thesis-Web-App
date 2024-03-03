import { useState } from "react";
// utils
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export type DynamicTab = {
  title: string;
  titleIcon?: React.ReactNode;
  value: string;
  content?: string | React.ReactNode | any;
};

export const DynamicTabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
  vertical = false,
}: {
  tabs: DynamicTab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
  vertical?: boolean;
}) => {
  const [active, setActive] = useState<DynamicTab>(propTabs[0]);
  const [tabs, setTabs] = useState<DynamicTab[]>(propTabs);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  const [hovering, setHovering] = useState(false);

  return (
    <>
      <div
        className={cn(
          `flex ${
            vertical ? "flex-col w-[20%]" : "flex-row w-full"
          } items-center justify-start [perspective:1000px] min-h-[3rem] relative overflow-auto sm:overflow-visible no-visible-scrollbar`,
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(idx);
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn("relative px-4 py-2 rounded-full", tabClassName)}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 bg-gray-200 dark:bg-zinc-800 rounded-full ",
                  activeTabClassName
                )}
              />
            )}

            <div className="relative text-black dark:text-white flex items-center gap-2">
              <span className={cn(`${!vertical && "hidden"}`)}>
                {tab.title}
              </span>
              {tab.titleIcon}
            </div>
          </button>
        ))}
      </div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn(`${!vertical && "mt-20"}`, contentClassName)}
      />
    </>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  hovering,
}: {
  className?: string;
  key?: string;
  tabs: DynamicTab[];
  active: DynamicTab;
  hovering?: boolean;
}) => {
  const isActive = (tab: DynamicTab) => {
    return tab.value === tabs[0].value;
  };
  return (
    <div className="relative w-full h-full">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: isActive(tab) ? [0, 40, 0] : 0,
          }}
          className={cn("w-full h-full absolute top-0 left-0", className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};
