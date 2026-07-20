import { useState, useEffect } from "react"
import { Save, Loader2, RefreshCw } from "lucide-react"
import { getSetting, setSetting } from "../../services/settingsService"
import toast from "react-hot-toast"

const DEFAULT_EN = {
  title: "Dakshinamurthy Astrology Centre",
  subtitle: "(Vastu)",
  p1: "We have over 15 years of experience in providing authentic Rudraksha beads. Every Rudraksha is carefully examined using multiple methods to ensure its authenticity, quality, and spiritual effectiveness.",
  p2: "We thoroughly test each Rudraksha to verify its quality, assess its energy, and determine whether it exhibits positive spiritual vibrations through modern testing techniques before selecting it for our customers.",
  p3: "There is no doubt that wearing a genuine Rudraksha can bring peace of mind, good health, spiritual growth, prosperity, and relief from astrological doshas (planetary afflictions). It is also believed that those who wear a Rudraksha receive the divine blessings of Lord Shiva.",
  p4: "Wearing a Rudraksha is considered the result of good deeds (punya) accumulated in previous births.",
  p5: "Nowadays, many low-quality and counterfeit Rudraksha beads are available in the market. Therefore, it is essential to verify the authenticity and quality of a Rudraksha before wearing it.",
  p6: "A properly selected and authentic Rudraksha can bring remarkable and beneficial results to the wearer.",
  years: "15+",
  yearsLabel: "Years of Experience",
  authentic: "100%",
  authenticLabel: "Authentic Products",
  customers: "10K+",
  customersLabel: "Happy Customers",
}

const DEFAULT_TE = {
  title: "దక్షిణామూర్తి జ్యోతిష్య కేంద్రం",
  subtitle: "(వాస్తు)",
  p1: "మేము 15 సంవత్సరాలకు పైగా అసలైన రుద్రాక్ష పూసలను అందించడంలో అనుభవం కలిగి ఉన్నాము.",
  p2: "మా కస్టమర్లకు ఎంపిక చేయడానికి ముందు ఆధునిక పరీక్షా పద్ధతుల ద్వారా ప్రతి రుద్రాక్ష యొక్క నాణ్యతను ధృవీకరిస్తాము.",
  p3: "నిజమైన రుద్రాక్ష ధరించడం మనో శాంతి, ఆరోగ్యం, ఆధ్యాత్మిక వికాసం మరియు శివుని దివ్య ఆశీస్సులు తీసుకొస్తుంది.",
  p4: "రుద్రాక్ష ధరించడం పూర్వ జన్మలలో చేసిన పుణ్య కర్మల ఫలితంగా భావిస్తారు.",
  p5: "నేటి కాలంలో మార్కెట్లో అనేక నకిలీ రుద్రాక్ష పూసలు ఉన్నాయి. అందువల్ల ప్రామాణికత ధృవీకరించడం చాలా అవసరం.",
  p6: "సరిగ్గా ఎంపిక చేయబడిన అసలైన రుద్రాక్ష ధరించే వ్యక్తికి అద్భుతమైన ఫలితాలను అందిస్తుంది.",
  years: "15+",
  yearsLabel: "సంవత్సరాల అనుభవం",
  authentic: "100%",
  authenticLabel: "అసలైన ఉత్పత్తులు",
  customers: "10వే+",
  customersLabel: "సంతుష్ట కస్టమర్లు",
}

const inp = "w-full bg-white border border-[#E5D8C8] rounded-lg px-3 py-2.5 text-sm text-[#1C1006] placeholder-[#8B6A4A] focus:outline-none focus:border-[#5D3A1A] resize-none"
const lbl = "text-xs text-[#4B3420] mb-1 block font-medium"

function LangForm({ lang, data, onChange }) {
  const fields = [
    { key: "title", label: "Centre Name / Title", rows: 1 },
    { key: "subtitle", label: "Subtitle (e.g. Vastu)", rows: 1 },
    { key: "p1", label: "Paragraph 1", rows: 3 },
    { key: "p2", label: "Paragraph 2", rows: 3 },
    { key: "p3", label: "Paragraph 3", rows: 3 },
    { key: "p4", label: "Paragraph 4", rows: 2 },
    { key: "p5", label: "Paragraph 5", rows: 2 },
    { key: "p6", label: "Paragraph 6", rows: 2 },
  ]
  const stats = [
    { key: "years", label: "Years Value (e.g. 15+)" },
    { key: "yearsLabel", label: "Years Label" },
    { key: "authentic", label: "Authentic Value (e.g. 100%)" },
    { key: "authenticLabel", label: "Authentic Label" },
    { key: "customers", label: "Customers Value (e.g. 10K+)" },
    { key: "customersLabel", label: "Customers Label" },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="px-3 py-1 rounded-full text-xs font-bold" style={{
          background: lang === "en" ? "#734129" : "#FABE1A",
          color: lang === "en" ? "#F2EAE0" : "#734129"
        }}>
          {lang === "en" ? "🇬🇧 English" : "🇮🇳 Telugu"}
        </span>
      </div>

      {/* Text fields */}
      {fields.map(f => (
        <div key={f.key}>
          <label className={lbl}>{f.label}</label>
          {f.rows === 1
            ? <input value={data[f.key] || ""} onChange={e => onChange(f.key, e.target.value)} className={inp} />
            : <textarea rows={f.rows} value={data[f.key] || ""} onChange={e => onChange(f.key, e.target.value)} className={inp} />
          }
        </div>
      ))}

      {/* Stats */}
      <div className="border-t border-[#E5D8C8] pt-4">
        <p className="text-xs font-bold text-[#4B3420] mb-3 uppercase tracking-wider">Stats Section</p>
        <div className="grid grid-cols-2 gap-3">
          {stats.map(s => (
            <div key={s.key}>
              <label className={lbl}>{s.label}</label>
              <input value={data[s.key] || ""} onChange={e => onChange(s.key, e.target.value)} className={inp} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function AdminAbout() {
  const [enData, setEnData] = useState(DEFAULT_EN)
  const [teData, setTeData] = useState(DEFAULT_TE)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("en")

  useEffect(() => {
    Promise.all([
      getSetting("about_section_en").catch(() => null),
      getSetting("about_section_te").catch(() => null),
    ]).then(([en, te]) => {
      if (en) { try { setEnData({ ...DEFAULT_EN, ...JSON.parse(en) }) } catch {} }
      if (te) { try { setTeData({ ...DEFAULT_TE, ...JSON.parse(te) }) } catch {} }
      setLoading(false)
    })
  }, [])

  const handleChange = (lang, key, val) => {
    if (lang === "en") setEnData(d => ({ ...d, [key]: val }))
    else setTeData(d => ({ ...d, [key]: val }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await Promise.all([
        setSetting("about_section_en", JSON.stringify(enData)),
        setSetting("about_section_te", JSON.stringify(teData)),
      ])
      toast.success("About section saved!")
    } catch (e) {
      toast.error(e.message || "Failed to save")
    } finally {
      setSaving(false)
    }
  }

  const handleReset = (lang) => {
    if (lang === "en") { setEnData(DEFAULT_EN); toast.success("Reset to defaults") }
    else { setTeData(DEFAULT_TE); toast.success("Reset to defaults") }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={28} className="animate-spin text-[#5D3A1A]" />
      </div>
    )
  }

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#5D3A1A]" style={{ fontFamily: "Georgia, serif" }}>
            About Section
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Edit the "About Us" content shown on the homepage. Changes save to the database and reflect instantly.
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => handleReset(activeTab)}
            className="flex items-center gap-1.5 px-4 py-2 border border-[#E5D8C8] text-[#4B3420] rounded-lg text-sm hover:bg-[#FFF5EE] transition-all">
            <RefreshCw size={14} /> Reset to Default
          </button>
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-5 py-2 bg-[#5D3A1A] text-white font-semibold rounded-lg hover:bg-[#7A4E28] transition-all disabled:opacity-60 text-sm">
            {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
            Save Changes
          </button>
        </div>
      </div>

      {/* Language Tabs */}
      <div className="flex gap-2 border-b border-[#E5D8C8] pb-0">
        {["en", "te"].map(lang => (
          <button key={lang} onClick={() => setActiveTab(lang)}
            className={`px-5 py-2.5 text-sm font-semibold rounded-t-lg transition-all border-b-2 ${
              activeTab === lang
                ? "border-[#734129] text-[#734129] bg-white"
                : "border-transparent text-gray-400 hover:text-[#734129]"
            }`}>
            {lang === "en" ? "🇬🇧 English" : "🇮🇳 Telugu"}
          </button>
        ))}
      </div>

      {/* Form */}
      <div className="bg-white border border-[#E5D8C8] rounded-xl p-6 shadow-sm">
        {activeTab === "en"
          ? <LangForm lang="en" data={enData} onChange={(k, v) => handleChange("en", k, v)} />
          : <LangForm lang="te" data={teData} onChange={(k, v) => handleChange("te", k, v)} />
        }
      </div>

      {/* Live Preview */}
      <div className="bg-white border border-[#E5D8C8] rounded-xl p-6 shadow-sm">
        <p className="text-xs font-bold text-[#4B3420] uppercase tracking-wider mb-4">Live Preview</p>
        <div className="border border-[#D4C4B4] rounded-xl p-5" style={{ background: "#F2EAE0" }}>
          <p className="text-[10px] uppercase tracking-[0.3em] mb-1 font-bold text-center" style={{ color: "#A67560" }}>
            {activeTab === "en" ? "About Us" : "మా గురించి"}
          </p>
          <h2 className="text-center font-bold text-xl mb-1" style={{ fontFamily: "Cinzel, serif", color: "#734129" }}>
            {activeTab === "en" ? enData.title : teData.title}
          </h2>
          <p className="text-center text-sm mb-4" style={{ color: "#A67560" }}>
            {activeTab === "en" ? enData.subtitle : teData.subtitle}
          </p>
          <div className="space-y-2">
            {["p1", "p2", "p3"].map(k => (
              <p key={k} className="text-sm leading-relaxed" style={{ color: "#A67560", fontFamily: "Lato, sans-serif" }}>
                {activeTab === "en" ? enData[k] : teData[k]}
              </p>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { v: "years", l: "yearsLabel" },
              { v: "authentic", l: "authenticLabel" },
              { v: "customers", l: "customersLabel" },
            ].map(s => {
              const d = activeTab === "en" ? enData : teData
              return (
                <div key={s.v} className="text-center p-3 rounded-xl" style={{ background: "#EAE0D3", border: "1px solid #D4C4B4" }}>
                  <p className="font-bold text-lg" style={{ color: "#734129", fontFamily: "Cinzel, serif" }}>{d[s.v]}</p>
                  <p className="text-[10px]" style={{ color: "#A67560" }}>{d[s.l]}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
