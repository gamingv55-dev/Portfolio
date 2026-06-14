/**
 * ============================================================
 *  ГЛАВНА СТРАНИЦА — „РАФТЪТ С ЕТИКЕТИ“
 * ============================================================
 *  Тук се вижда целият flow на сайта в реда, в който убеждава:
 *
 *   1. Hero ............... силно първо впечатление + CTA
 *   2. ProblemSolution ... разпознаване на болката → решение
 *   3. Services .......... нивата сайтове (оферта)
 *   4. Portfolio ......... доказателство (интерактивен preview)
 *   5. Process ........... как стигаме до резултата
 *   6. WhyMe ............. доверие
 *   7. Results ........... осезаема стойност
 *   8. Contact ........... конверсия
 *
 *  Логика на UX: проблем → решение → доказателство → контакт.
 * ============================================================
 */
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";

import Hero from "@/components/sections/Hero";
import ProblemSolution from "@/components/sections/ProblemSolution";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Process from "@/components/sections/Process";
import WhyMe from "@/components/sections/WhyMe";
import Results from "@/components/sections/Results";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="relative">
        <Hero />
        <ProblemSolution />
        <Services />
        <Portfolio />
        <Process />
        <WhyMe />
        <Results />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
