"use client"

import { useEffect, useRef, useState } from "react"
import {
  Award,
  Rocket,
  Landmark,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Globe,
  Medal,
  Cpu,
  BookOpen,
  Building2,
  Heart,
  ChevronRight,
  ExternalLink,
  Quote,
  CheckCircle2,
  Layers,
  FileText,
  X
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function AdvisorSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<"overview" | "credentials" | "innovations" | "education">("overview")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imgError, setImgError] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const keyAchievements = [
    {
      title: "Founder & CEO",
      subtitle: "NEO Aeronautics, Inc.",
      desc: "Leading futuristic electric vertical takeoff and landing (eVTOL) aerial mobility innovations.",
      icon: Rocket,
      badge: "Aerospace Pioneer",
      gradient: "from-[#ff6b35]/20 to-orange-950/30",
      borderColor: "group-hover:border-[#ff6b35]/60",
      iconColor: "text-[#ff6b35]"
    },
    {
      title: "Former Nominated Member",
      subtitle: "Parliament of Singapore",
      desc: "Contributed to national science, technology, engineering, and innovation policy.",
      icon: Landmark,
      badge: "Legislative Leader",
      gradient: "from-blue-900/20 to-slate-900/40",
      borderColor: "group-hover:border-blue-500/60",
      iconColor: "text-blue-400"
    },
    {
      title: "Fellow (FRAeS)",
      subtitle: "Royal Aeronautical Society",
      desc: "Highest international honor for exceptional distinction in aerospace science and engineering.",
      icon: Award,
      badge: "Global Honor",
      gradient: "from-amber-900/20 to-yellow-950/30",
      borderColor: "group-hover:border-amber-500/60",
      iconColor: "text-amber-400"
    },
    {
      title: "Fellow (FIES)",
      subtitle: "Institution of Engineers, Singapore",
      desc: "Recognized for outstanding achievements and leaders in engineering excellence.",
      icon: ShieldCheck,
      badge: "Engineering Fellow",
      gradient: "from-emerald-900/20 to-green-950/30",
      borderColor: "group-hover:border-emerald-500/60",
      iconColor: "text-emerald-400"
    },
    {
      title: "Honorary Fellow (FAFEO)",
      subtitle: "ASEAN Federation of Engineering Organisations",
      desc: "Regional recognition for impactful contributions to engineering across ASEAN nations.",
      icon: Medal,
      badge: "ASEAN Distinction",
      gradient: "from-cyan-900/20 to-blue-950/30",
      borderColor: "group-hover:border-cyan-500/60",
      iconColor: "text-cyan-400"
    },
    {
      title: "Adjunct Professor & Educator",
      subtitle: "Global Top Universities",
      desc: "Faculty at SIT, Harvard Kennedy School, NUS, NTU, SMU, Tsinghua, Fudan & ISB.",
      icon: GraduationCap,
      badge: "Global Academic",
      gradient: "from-purple-900/20 to-indigo-950/30",
      borderColor: "group-hover:border-purple-500/60",
      iconColor: "text-purple-400"
    },
    {
      title: "Innovation & Aerospace Leader",
      subtitle: "Pioneering Key Inventions",
      desc: "Developed Singapore's 1st eVTOL and World's 1st Wearable Artificial Kidney (AWAK).",
      icon: Sparkles,
      badge: "Award-Winning",
      gradient: "from-rose-900/20 to-pink-950/30",
      borderColor: "group-hover:border-rose-500/60",
      iconColor: "text-rose-400"
    }
  ]

  const qualifications = [
    { degree: "Doctor of Innovation", institution: "Singapore Management University (SMU)" },
    { degree: "Master of Business Administration", institution: "Nanyang Technological University (NTU)" },
    { degree: "Bachelor of Electrical Engineering", institution: "National University of Singapore (NUS)" },
    { degree: "Science, Technology & Innovation Policy Certificate", institution: "Harvard University (Kennedy School)" },
    { degree: "Certificate in Strategy & Innovation", institution: "Massachusetts Institute of Technology (MIT)" }
  ]

  const majorAwards = [
    { title: "USA VAi2 Innovation Award", detail: "USA Dept. of Veterans' Affairs Award for developing World's 1st Automated Wearable Artificial Kidney (AWAK)." },
    { title: "IES Prestigious Engineering Achievement Award", detail: "For developing Singapore's 1st eVTOL ('flying car')." },
    { title: "President's Design Award", detail: "National honor for 3D printer design excellence." },
    { title: "SkillsFuture Fellowship 2023", detail: "Awarded by the President of Singapore for lifelong learning and educational mastery." },
    { title: "MSF Long Service Award 2024", detail: "Recognized for community service and foster parenting dedication." },
    { title: "Engineering Accreditation Board (EAB)", detail: "Appointed member advancing engineering education standards." }
  ]

  return (
    <section
      ref={sectionRef}
      id="advisor"
      className="relative py-20 sm:py-28 bg-gradient-to-b from-black via-[#090b14] to-black overflow-hidden text-white border-t border-white/10"
    >
      {/* Background Cosmic Accents & Radial Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,107,53,0.15),rgba(255,255,255,0))]" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#ff6b35]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-purple-900/15 rounded-full blur-3xl pointer-events-none" />

      {/* Abstract Orbital Ring Graphic Elements */}
      <div className="absolute top-12 right-10 w-80 h-80 border border-[#ff6b35]/10 rounded-full animate-spin-slow pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 border border-blue-500/10 rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center max-w-4xl mx-auto mb-14 sm:mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/30 mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#ff6b35] animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#ff6b35]">
              Space Kidz India Leadership
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 text-balance">
            Welcome Our Advisor – <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] via-orange-400 to-amber-300">Dr. Neo Kok Beng</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Distinguished Engineer, Educator, Entrepreneur, and Aerospace Innovator guiding Space Kidz India toward pioneering new cosmic frontiers.
          </p>
        </div>

        {/* Main Grid: Portrait (Left Desktop / Top Mobile) & Bio/Welcome (Right Desktop) */}
        <div
          className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16 sm:mb-24 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Portrait Column: lg:col-span-5 */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md mx-auto group">
              {/* Decorative Cosmic Halo Glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#ff6b35] via-purple-600 to-blue-500 rounded-3xl blur opacity-40 group-hover:opacity-75 transition duration-700" />

              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#161a2b] to-[#0d0f19] border border-white/15 p-2 shadow-2xl">
                <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-black/40">
                  <img
                    src={imgError ? "/beng.jpeg" : "/beng.jpeg"}
                    alt="Dr. Neo Kok Beng - Advisor of Space Kidz India"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Overlay Gradient for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  {/* Floating Badge on Portrait */}
                  <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white">Dr. Neo Kok Beng</h3>
                        <p className="text-xs text-[#ff6b35] font-semibold">Advisor, Space Kidz India</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#ff6b35]/20 border border-[#ff6b35]/50 flex items-center justify-center">
                        <Award className="w-5 h-5 text-[#ff6b35]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Welcome Message & Detailed Bio (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            {/* Suggested Welcome Message Box */}
            <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#ff6b35]/15 via-black/80 to-purple-950/20 border-l-4 border-[#ff6b35] border-y border-r border-white/10 shadow-xl">
              <Quote className="w-10 h-10 text-[#ff6b35]/40 absolute top-4 right-4 pointer-events-none" />
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="bg-[#ff6b35]/20 text-[#ff6b35] border-[#ff6b35]/40 px-3 py-1 font-semibold text-xs">
                  Official Announcement
                </Badge>
              </div>

              <p className="text-base sm:text-lg text-white/90 leading-relaxed font-medium italic relative z-10">
                "Space Kidz India is delighted to welcome Dr. Neo Kok Beng as an Advisor. His exceptional leadership in aerospace, innovation, engineering, and education, combined with decades of global experience, will greatly strengthen our mission of inspiring young minds and advancing space education. We are honored to have him join our journey toward empowering the next generation of space explorers and innovators."
              </p>

              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                <span className="font-semibold text-white/80">— Space Kidz India Team</span>
                <span className="text-[#ff6b35]">Empowering Future Scientists</span>
              </div>
            </div>

            {/* Biography Summary */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#ff6b35]" />
                Distinguished Career & Profile
              </h3>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Dr. Neo Kok Beng has distinguished himself internationally and locally as an engineer, educator, and entrepreneur. With over three decades of global leadership spanning commercial tech development, policy design, and academic excellence, Dr. Neo brings a wealth of expertise to Space Kidz India.
              </p>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                As the Founder & CEO of NEO Aeronautics, Inc., he has pioneered cutting-edge electric VTOL aerial vehicle technology. He has held executive roles including Vice President at ST Engineering (managing operations across Silicon Valley and Shanghai), served as a Nominated Member of the Parliament of Singapore, and taught as Associate Faculty at Harvard Kennedy School and UNDP Visiting Professor.
              </p>
            </div>

            {/* Quick Action Button */}
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#ff6b35] hover:bg-[#ff8555] text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-[#ff6b35]/25 transition-all flex items-center gap-2"
              >
                <span>Read Full Biography & Timeline</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Key Achievements Grid (7 Cards) */}
        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Key Accomplishments & Leadership
              </h3>
              <p className="text-sm text-white/60 mt-1">
                Pioneering contributions across engineering, aerospace, public policy, and global education.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {keyAchievements.map((item, idx) => {
              const IconComp = item.icon
              return (
                <div
                  key={idx}
                  className={`group relative rounded-2xl p-6 bg-gradient-to-br ${item.gradient} border border-white/10 ${item.borderColor} backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/50 flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-black/40 border border-white/10 ${item.iconColor}`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <Badge variant="outline" className="text-[10px] bg-white/5 border-white/15 text-white/80">
                        {item.badge}
                      </Badge>
                    </div>

                    <h4 className="text-lg font-bold text-white mb-1 group-hover:text-[#ff6b35] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs font-semibold text-[#ff6b35] mb-3">{item.subtitle}</p>
                    <p className="text-xs text-white/70 leading-relaxed">{item.desc}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50 group-hover:text-white/80 transition-colors">
                    <span>Credential Verified</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#ff6b35]" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Tabbed Detailed View: Academic Credentials, Inventions, Education & Community */}
        <div className="mt-16 sm:mt-24 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8 border-b border-white/10 pb-6">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                activeTab === "overview"
                  ? "bg-[#ff6b35] text-white shadow-lg shadow-[#ff6b35]/30"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Honors & Fellowships</span>
            </button>

            <button
              onClick={() => setActiveTab("credentials")}
              className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                activeTab === "credentials"
                  ? "bg-[#ff6b35] text-white shadow-lg shadow-[#ff6b35]/30"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Academic Qualifications</span>
            </button>

            <button
              onClick={() => setActiveTab("innovations")}
              className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                activeTab === "innovations"
                  ? "bg-[#ff6b35] text-white shadow-lg shadow-[#ff6b35]/30"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Awards & Inventions</span>
            </button>

            <button
              onClick={() => setActiveTab("education")}
              className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                activeTab === "education"
                  ? "bg-[#ff6b35] text-white shadow-lg shadow-[#ff6b35]/30"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Faculty & Global Teaching</span>
            </button>
          </div>

          {/* Tab Contents */}
          {activeTab === "overview" && (
            <div className="grid md:grid-cols-3 gap-6 animate-fadeIn">
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 font-bold">
                  FRAeS
                </div>
                <h4 className="text-base font-bold text-white mb-2">Royal Aeronautical Society</h4>
                <p className="text-xs text-white/70 leading-relaxed">
                  Conferred Fellow status (FRAeS) in recognition of high achievement and outstanding contribution to aeronautical and aerospace engineering.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 font-bold">
                  FIES
                </div>
                <h4 className="text-base font-bold text-white mb-2">Institution of Engineers, Singapore</h4>
                <p className="text-xs text-white/70 leading-relaxed">
                  Fellow of IES, demonstrating peer-recognized leadership and excellence in engineering practices and national standard setting.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4 font-bold">
                  FAFEO
                </div>
                <h4 className="text-base font-bold text-white mb-2">ASEAN Federation of Engineering</h4>
                <p className="text-xs text-white/70 leading-relaxed">
                  Honorary Fellow (FAFEO) conferred for regional leadership and advancing cross-border engineering collaboration across Southeast Asia.
                </p>
              </div>
            </div>
          )}

          {activeTab === "credentials" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeIn">
              {qualifications.map((q, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-black/40 border border-white/10 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#ff6b35]/20 text-[#ff6b35] flex items-center justify-center shrink-0 mt-0.5">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">{q.degree}</h5>
                    <p className="text-xs text-white/60 mt-1">{q.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "innovations" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeIn">
              {majorAwards.map((a, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-black/40 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <h5 className="text-sm font-bold text-white">{a.title}</h5>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed">{a.detail}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "education" && (
            <div className="space-y-4 text-xs sm:text-sm text-white/80 leading-relaxed animate-fadeIn">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                  <h4 className="text-base font-bold text-[#ff6b35] flex items-center gap-2">
                    <Landmark className="w-4 h-4" />
                    Harvard & International Policy
                  </h4>
                  <p>
                    Appointed Associate Faculty (Science Technology & Globalisation) at <strong>Harvard Kennedy School</strong>, designing and teaching executive programs such as <em>"Innovation for Economic Development"</em> and <em>"Technology, Innovation & Entrepreneurship"</em>.
                  </p>
                  <p>
                    Appointed <strong>UNDP Visiting Professor of Social Innovation & Entrepreneurship</strong> in 2019.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                  <h4 className="text-base font-bold text-[#ff6b35] flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Global University Faculty
                  </h4>
                  <p>
                    Adjunct Professor at Singapore Institute of Technology (SIT). Taught innovation & entrepreneurship across leading universities including <strong>NUS, NTU, SMU, SUSS, Tsinghua University, Fudan University</strong>, and the <strong>Indian School of Business (ISB)</strong>.
                  </p>
                  <p>
                    Recipient of the <strong>SkillsFuture Fellowship 2023</strong> awarded by the President of Singapore.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Biography Modal Drawer */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0d0f19] border border-white/20 rounded-3xl p-6 sm:p-10 shadow-2xl text-white">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-[#ff6b35] text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#ff6b35]/20 border border-[#ff6b35]/40 flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#ff6b35]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Dr. Neo Kok Beng</h3>
                <p className="text-xs text-[#ff6b35] font-semibold">Advisor, Space Kidz India — Complete Biography</p>
              </div>
            </div>

            <div className="space-y-6 text-sm text-white/80 leading-relaxed border-t border-white/10 pt-6">
              <div>
                <h4 className="text-base font-bold text-white mb-2">Profile & Distinctions</h4>
                <p>
                  Dr. Neo has distinguished himself internationally and locally as an engineer, educator, and entrepreneur. For his contributions to the engineering profession, he achieved international, regional, and local recognitions as Fellow of Royal Aeronautical Society (FRAeS), Honorary Fellow of ASEAN Federation of Engineering Organisations (FAFEO), and Fellow of Institution of Engineers, Singapore (FIES). He was also appointed to the Engineering Accreditation Board (EAB).
                </p>
              </div>

              <div>
                <h4 className="text-base font-bold text-white mb-2">Promotions of Innovation to Industry</h4>
                <p>
                  He received the USA Department of Veterans' Affairs Innovation Award (VAi2) for the development of world's 1st automated wearable portable artificial kidney (AWAK), the IES Prestigious Engineering Achievement Award for the development of Singapore's 1st eVTOL ("flying car"), and the President's Design Award for 3D printer design. He is the current co-convenor of the national ISO 56000 Innovation Management System.
                </p>
              </div>

              <div>
                <h4 className="text-base font-bold text-white mb-2">International Technology Policy & Education</h4>
                <p>
                  He was appointed as Associate Faculty (Science Technology & Globalisation) at Harvard Kennedy School, designing and teaching high-level executive programmes such as "Innovation for Economic Development" and "Technology, Innovation & Entrepreneurship" for policy makers. He was also appointed as UNDP Visiting Professor of Social Innovation & Entrepreneurship in 2019.
                </p>
              </div>

              <div>
                <h4 className="text-base font-bold text-white mb-2">Education, Life-Long Learning & Community</h4>
                <p>
                  He was awarded the SkillsFuture Fellowship 2023 by the President of Singapore. He is an Adjunct Professor with Singapore Institute of Technology and has taught as adjunct faculty at NUS, NTU, SMU, and SUSS. As a renowned practitioner-academic, he has taught in leading international institutions including Harvard, Tsinghua, Fudan, and Indian School of Business. For his social contributions, he received the MSF Long Service Award (Foster Parenting) in 2024, PA Community Development Award 2002, and PA Community Club Management Committee 1999. He is also a volunteer of Community on Patrol (CoP) with Singapore Police Force.
                </p>
              </div>

              <div>
                <h4 className="text-base font-bold text-white mb-2">Industry Experience (ST Engineering)</h4>
                <p>
                  From 1991 to 2002 at ST Engineering, he rose from a system engineer to product manager, marketing manager, regional business manager, general manager (on sites in Silicon Valley and Shanghai), to Vice President of business development and strategic planning. He was awarded the ST Computer post-graduate scholarship and the Hewlett-Packard MBA scholarship during this period.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
              <Button
                onClick={() => setIsModalOpen(false)}
                className="bg-[#ff6b35] hover:bg-[#ff8555] text-white font-bold px-6 py-2.5 rounded-xl"
              >
                Close Biography
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
