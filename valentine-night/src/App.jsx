import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bg from "./assets/valentine-night.png";

function App() {
  const [phase, setPhase] = useState("start");
  const [count, setCount] = useState(3);
  const [scanStep, setScanStep] = useState(0);
  const [noMoves, setNoMoves] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [feedbackStep, setFeedbackStep] = useState("idle");


  // COUNTDOWN
  useEffect(() => {
    if (phase === "countdown" && count > 0) {
      const timer = setTimeout(() => {
        setCount((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (phase === "countdown" && count === 0) {
      const timer = setTimeout(() => {
        setPhase("game");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [phase, count]);

  // SCAN ANIMATION
  useEffect(() => {
    if (phase === "scan" && scanStep < 5) {
      const timer = setTimeout(() => {
        setScanStep((prev) => prev + 1);
      }, 1200);
      return () => clearTimeout(timer);
    }

    if (phase === "scan" && scanStep === 5) {
      const timer = setTimeout(() => {
        setPhase("overreact");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [phase, scanStep]);

  // OVERREACT → BOSS
  useEffect(() => {
    if (phase === "overreact") {
      const timer = setTimeout(() => {
        setPhase("boss");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
  if (feedbackStep === "recording") {
    const timer = setTimeout(() => {
      setFeedbackStep("processed");
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }})



  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-white/15 backdrop-blur-xl w-[90%] max-w-xl p-10 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.2)] border border-white/20">
        <AnimatePresence mode="wait">

          {/* START SCREEN */}
          {phase === "start" && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <h1
                className="text-lg mb-8 text-white"
                style={{ fontFamily: "var(--font-pixel)" }}
              >
                LETS PLAY A MINI GAME
              </h1>

              <button
                onClick={() => {
                  setCount(3);
                  setPhase("countdown");
                }}
                className="px-6 py-3 bg-pink-400 text-white rounded-lg hover:scale-105 transition"
              >
                START GAME
              </button>
            </motion.div>
          )}

          {/* COUNTDOWN */}
          {phase === "countdown" && (
            <motion.div
              key="countdown"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <h1
                className="text-4xl text-white"
                style={{ fontFamily: "var(--font-pixel)" }}
              >
                {count > 0 ? count : "GO"}
              </h1>
            </motion.div>
          )}

          {/* GAME SCREEN */}
          {phase === "game" && (
            <motion.div
              key="game"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <h1
                className="text-center text-lg mb-6 text-white"
                style={{ fontFamily: "var(--font-pixel)" }}
              >
                LET'S SET UP OUR MYSTERIOUS ACT BEFORE
              </h1>

              <p className="text-center text-white mb-6">
                Stop smiling.
              </p>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    setScanStep(0);
                    setPhase("scan");
                  }}
                  className="px-4 py-2 bg-pink-400 rounded-lg hover:scale-105 transition"
                >
                  Maybe 🙂
                </button>

                <button
                  onClick={() => {
                    setScanStep(0);
                    setPhase("scan");
                  }}
                  className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:scale-105 transition"
                >
                  Shut up 😑
                </button>
              </div>
            </motion.div>
          )}

          {/* SCAN */}
          {phase === "scan" && (
            <motion.div
              key="scan"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-white space-y-4"
              style={{ fontFamily: "var(--font-pixel)", fontSize: "12px" }}
            >
              {scanStep >= 1 && <p>Scanning facial muscles...</p>}
              {scanStep >= 2 && <p>Damn look at her trying LOL...</p>}
              {scanStep >= 3 && <p>Detecting micro-smirk...</p>}
              {scanStep >= 4 && <p>Analyzing cuteness levels...</p>}
              {scanStep >= 5 && (
                <p className="text-pink-300">ERROR: Too adorable.</p>
              )}
              {scanStep >= 6 && <p>System compromised.</p>}
            </motion.div>
          )}

          {/* OVERREACT */}
          {phase === "overreact" && (
            <motion.div
              key="overreact"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-white"
              style={{ fontFamily: "var(--font-pixel)" }}
            >
              <h1 className="text-2xl mb-4">MAYBE?????</h1>
              <p>So we’re playing games now?</p>
              <p className="text-pink-300 mt-4">I respect it.</p>
            </motion.div>
          )}

          {/* FINAL BOSS */}
{phase === "boss" && (
  <motion.div
    key="boss"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-center text-white relative"
    style={{ fontFamily: "var(--font-pixel)" }}
  >
    <h1 className="text-xl mb-6">FINAL BOSS UNLOCKED</h1>

    <p className="mb-6 text-pink-300">
      So… will you be my Valentine?
    </p>

    <div className="flex justify-center gap-6 relative h-32">

      {/* YES BUTTON */}
      <button
        onClick={() => setPhase("yes")}
        className="px-3 py-1 bg-pink-400 text-white rounded-lg hover:scale-110 transition"
      >
        Yes 🤎
      </button>

      {/* CHAOTIC NO BUTTON */}
      <motion.button
        onClick={() => {
          if (noMoves < 3) {
            setNoMoves((prev) => prev + 1);
            setNoPosition({
              x: Math.random() * 400 - 200,
              y: Math.random() * 200 - 100,
            });
          } else {
            setPhase("yes");
          }
        }}
        animate={{ x: noPosition.x, y: noPosition.y }}
        transition={{ type: "spring", stiffness: 300 }}
        className="px-6 py-3 bg-gray-700 text-white rounded-lg absolute"
      >
        {noMoves < 3 ? "No 🗿" : "Fine. Yes 🤎"}
      </motion.button>

    </div>
  </motion.div>
)}

{/* YES FLOW */}
{phase === "yes" && (
  <motion.div
    key="yes"
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="text-center text-white"
    style={{ fontFamily: "var(--font-pixel)" }}
  >
    {feedbackStep === "idle" && (
      <>
        <h1 className="text-xl mb-6 text-pink-300">
          DING DING! CORRECT
        </h1>

        <p className="mb-4">HOWEVERRRR!!!</p>

        <p className="mb-6">
          This site values user feedback.
        </p>

        <button
          onClick={() => setFeedbackStep("recording")}
          className="px-6 py-3 bg-pink-400 text-white rounded-lg hover:scale-110 transition"
        >
          🎤 Give Feedback
        </button>
      </>
    )}

    {feedbackStep === "recording" && (
      <>
        <h1 className="text-xl mb-6 text-pink-300">
          Recording Feedback...
        </h1>

        <p className="animate-pulse">
          Listening very seriously.
        </p>
        <h1 className="text-xl mb-6 text-pink-300">
      Processing Audio...
    </h1>
      </>
    )}

    {feedbackStep === "processed" && (
  <>
    <h1 className="text-xl mb-6 text-pink-300">
      Lady,You do need captions lmaoooo.
    </h1>

    <p className="mb-6">
      Jk, thanks for the feedback.
    </p>

    <div className="flex justify-center gap-6">
      <button
        onClick={() => setFeedbackStep("final")}
        className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:scale-110 transition"
      >
        Shut up.
      </button>

      <button
        onClick={() => setFeedbackStep("final")}
        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:scale-110 transition"
      >
        I really do 😭
      </button>
    </div>
  </>
)}


    {feedbackStep === "final" && (
      <>
        <h1 className="text-xl mb-6 text-pink-300">
          TIRAMISU PROTOCOL UNLOCKED 🍰
        </h1>

        <p className="mb-4">
          Virtual tiramisu date confirmed.
        </p>

        <p className="text-sm opacity-80">
          Real one is on its way to you.
        </p>
        <p className="text-sm">by Goontaas.</p>
      </>
    )}
  </motion.div>
)}

        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
