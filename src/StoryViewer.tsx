import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 1. DEFINICIÓN DE LA INTERFAZ (Para TypeScript)
interface Story {
  id: number;
  title: string;
  subtitle: string;
  color: string;
  image: string;
}

// 2. DEFINICIÓN DE LAS HISTORIAS (Debe ir antes del componente)
const STORIES: Story[] = [
  { id: 1, title: '', subtitle: '', color: '#88D1CD', image: '/Bahia 2025_1.png' },
  { id: 2, title: '', subtitle: '', color: '#003D33', image: '/Bahia 2025_2.png' },
  { id: 3, title: '', subtitle: '', color: '#003D33', image: '/Bahia 2025_3.png' },
  { id: 4, title: '', subtitle: '', color: '#003D33', image: '/Bahia 2025_4.png' },
  { id: 5, title: '', subtitle: '', color: '#88D1CD', image: '/Bahia 2025_5.png' },
  { id: 6, title: '', subtitle: '', color: '#88D1CD', image: '/Bahia 2025_6.png' },
];

export default function StoryViewer() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress(p => p + 1);
      } else {
        nextStory();
      }
    }, 40); // 4 segundos por pantalla
    return () => clearInterval(timer);
  }, [progress, current]);

  const nextStory = () => {
    if (current < STORIES.length - 1) {
      setCurrent(current + 1);
      setProgress(0);
    }
  };

  const prevStory = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (current > 0) {
      setCurrent(current - 1);
      setProgress(0);
    }
  };

  return (
    <div className="relative h-screen w-full md:max-w-[450px] md:h-[850px] mx-auto bg-black overflow-hidden md:rounded-[3rem] shadow-2xl">
      
      {/* Barras de progreso */}
      <div className="absolute top-6 w-full flex px-4 gap-1.5 z-50">
        {STORIES.map((_, i) => (
          <div key={i} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-white"
              animate={{ width: i === current ? `${progress}%` : i < current ? '100%' : '0%' }}
              transition={{ ease: "linear" }}
            />
          </div>
        ))}
      </div>

      {/* Zonas de clic para navegar */}
      <div className="absolute inset-0 z-30 flex">
        <div className="w-1/3 h-full cursor-pointer" onClick={prevStory} />
        <div className="w-2/3 h-full cursor-pointer" onClick={nextStory} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative h-full w-full"
        >
          <img 
            src={STORIES[current].image} 
            className="w-full h-full object-cover" 
            alt="Bahia Motors" 
          />
        </motion.div>
      </AnimatePresence>

      {/* Botón final */}
      {current === STORIES.length - 1 && (
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute bottom-10 w-full flex justify-center z-40 px-10"
        >
          <button className="bg-white text-[#003D33] font-bold py-4 w-full rounded-full shadow-xl">
            COMPARTIR ESTA HISTORIA
          </button>
        </motion.div>
      )}
    </div>
  );
}