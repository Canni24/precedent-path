import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { SearchPanel } from "@/components/SearchPanel";
import { renderCanvas } from "@/components/ui/canvas";
import { ResultsViewer } from "@/components/ResultsViewer";
import { DossierPanel } from "@/components/DossierPanel";
import { SettingsModal } from "@/components/SettingsModal";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { CitationNetwork } from "@/components/CitationNetwork";
import { BookmarksPanel } from "@/components/BookmarksPanel";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scale, Settings, LogOut, BarChart3, Network, Bookmark, History, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Comprehensive mock data - 50+ legal cases
const comprehensiveCaseDatabase = [
  {
    id: "1",
    title: "Satyabrata Ghose v. Mugneeram Bangur & Co.",
    court: "Supreme Court of India",
    date: "10 Dec 1954",
    tags: ["Contract Law", "Frustration", "Impossibility", "Force Majeure"],
    relevance: 94,
    jurisdiction: "india",
    courtLevel: "supreme",
    snippet: "The doctrine of frustration applies when supervening events make the performance of a contract impossible or illegal. The court held that where performance becomes impossible due to circumstances beyond control, the contract stands discharged.",
    citations: 342,
    fullText: "This landmark case established the doctrine of frustration in Indian contract law...",
  },
  {
    id: "2",
    title: "Kailash Nath Associates v. Delhi Development Authority",
    court: "Supreme Court of India",
    date: "15 Mar 2015",
    tags: ["Specific Performance", "Real Estate", "Contract", "Property Law"],
    relevance: 87,
    jurisdiction: "india",
    courtLevel: "supreme",
    snippet: "Specific performance is a discretionary remedy and the court must balance equities between the parties. The court emphasized that specific performance should be granted when monetary compensation is inadequate.",
    citations: 198,
  },
  {
    id: "3",
    title: "Hadley v. Baxendale",
    court: "Court of Exchequer",
    date: "23 Feb 1854",
    tags: ["Damages", "Remoteness", "Contract", "Breach"],
    relevance: 81,
    jurisdiction: "uk",
    courtLevel: "appellate",
    snippet: "Damages recoverable for breach of contract are those which may fairly and reasonably be considered arising naturally from the breach, or such as may reasonably be supposed to have been in contemplation of parties at the time of contract.",
    citations: 1247,
  },
  {
    id: "4",
    title: "Central Inland Water Transport Corporation v. Brojo Nath Ganguly",
    court: "Supreme Court of India",
    date: "18 Oct 1986",
    tags: ["Labour Law", "Employment", "Termination", "Natural Justice"],
    relevance: 89,
    jurisdiction: "india",
    courtLevel: "supreme",
    snippet: "Arbitrary termination of employment without proper procedure violates Article 14. The Supreme Court held that principles of natural justice apply even to contractual relationships.",
    citations: 567,
  },
  {
    id: "5",
    title: "Kesavananda Bharati v. State of Kerala",
    court: "Supreme Court of India",
    date: "24 Apr 1973",
    tags: ["Constitutional Law", "Fundamental Rights", "Basic Structure", "Amendment"],
    relevance: 96,
    jurisdiction: "india",
    courtLevel: "supreme",
    snippet: "The basic structure doctrine holds that certain fundamental features of the Constitution cannot be amended by Parliament. This is the most cited constitutional case in Indian legal history.",
    citations: 2891,
  },
  {
    id: "6",
    title: "Carlill v. Carbolic Smoke Ball Company",
    court: "Court of Appeal",
    date: "07 Dec 1892",
    tags: ["Contract Law", "Offer", "Acceptance", "Consideration", "Unilateral Contract"],
    relevance: 85,
    jurisdiction: "uk",
    courtLevel: "appellate",
    snippet: "Advertisement can constitute a valid offer capable of acceptance. The court held that the reward offered for using the smoke ball as directed was a binding contract.",
    citations: 892,
  },
  {
    id: "7",
    title: "Vishaka v. State of Rajasthan",
    court: "Supreme Court of India",
    date: "13 Aug 1997",
    tags: ["Sexual Harassment", "Workplace", "Women's Rights", "PIL"],
    relevance: 93,
    jurisdiction: "india",
    courtLevel: "supreme",
    snippet: "Landmark judgment establishing guidelines for prevention of sexual harassment at workplace. Led to the Sexual Harassment Act 2013.",
    citations: 743,
  },
  {
    id: "8",
    title: "M.C. Mehta v. Union of India (Oleum Gas Leak Case)",
    court: "Supreme Court of India",
    date: "20 Dec 1986",
    tags: ["Environmental Law", "Absolute Liability", "Public Interest", "Tort"],
    relevance: 91,
    jurisdiction: "india",
    courtLevel: "supreme",
    snippet: "Principle of absolute liability in cases of hazardous activities. Enterprises engaged in hazardous activities are absolutely liable for harm caused.",
    citations: 654,
  },
  {
    id: "9",
    title: "Donoghue v. Stevenson",
    court: "House of Lords",
    date: "26 May 1932",
    tags: ["Negligence", "Duty of Care", "Tort Law", "Product Liability"],
    relevance: 88,
    jurisdiction: "uk",
    courtLevel: "supreme",
    snippet: "Established the modern law of negligence and the neighbour principle. You must take reasonable care to avoid acts which you can reasonably foresee would injure your neighbour.",
    citations: 1534,
  },
  {
    id: "10",
    title: "Maneka Gandhi v. Union of India",
    court: "Supreme Court of India",
    date: "25 Jan 1978",
    tags: ["Constitutional Law", "Personal Liberty", "Article 21", "Due Process"],
    relevance: 95,
    jurisdiction: "india",
    courtLevel: "supreme",
    snippet: "Expanded interpretation of Article 21 - right to life and personal liberty. Procedure established by law must be fair, just and reasonable.",
    citations: 1987,
  },
  {
    id: "11",
    title: "Rylands v. Fletcher",
    court: "House of Lords",
    date: "17 Jul 1868",
    tags: ["Tort Law", "Strict Liability", "Non-Natural Use", "Escape"],
    relevance: 83,
    jurisdiction: "uk",
    courtLevel: "supreme",
    snippet: "Person who brings something dangerous onto their land is strictly liable if it escapes and causes damage. Established principle of strict liability.",
    citations: 976,
  },
  {
    id: "12",
    title: "Shreya Singhal v. Union of India",
    court: "Supreme Court of India",
    date: "24 Mar 2015",
    tags: ["IT Act", "Section 66A", "Freedom of Speech", "Internet Law"],
    relevance: 92,
    jurisdiction: "india",
    courtLevel: "supreme",
    snippet: "Section 66A of IT Act struck down as unconstitutional. Protected freedom of speech and expression on internet platforms.",
    citations: 543,
  },
  {
    id: "13",
    title: "Balfour v. Balfour",
    court: "Court of Appeal",
    date: "30 Jun 1919",
    tags: ["Contract Law", "Intention to Create Legal Relations", "Domestic Agreements"],
    relevance: 79,
    jurisdiction: "uk",
    courtLevel: "appellate",
    snippet: "Domestic agreements between spouses do not create legally binding contracts as there is no intention to create legal relations.",
    citations: 654,
  },
  {
    id: "14",
    title: "Indian Medical Association v. V.P. Shantha",
    court: "Supreme Court of India",
    date: "13 Sep 1995",
    tags: ["Consumer Law", "Medical Negligence", "Service", "Healthcare"],
    relevance: 86,
    jurisdiction: "india",
    courtLevel: "supreme",
    snippet: "Medical profession falls within ambit of Consumer Protection Act. Patients are consumers and doctors provide service.",
    citations: 432,
  },
  {
    id: "15",
    title: "Salomon v. Salomon & Co Ltd",
    court: "House of Lords",
    date: "16 Nov 1896",
    tags: ["Company Law", "Separate Legal Entity", "Corporate Veil", "Limited Liability"],
    relevance: 90,
    jurisdiction: "uk",
    courtLevel: "supreme",
    snippet: "Company has separate legal personality from its shareholders. Established the principle of corporate personality and limited liability.",
    citations: 1234,
  },
  // Adding 35 more cases for comprehensive database
  {
    id: "16",
    title: "Mohori Bibee v. Dharmodas Ghose",
    court: "Privy Council",
    date: "10 Mar 1903",
    tags: ["Contract Law", "Minor", "Capacity", "Void Agreement"],
    relevance: 82,
    jurisdiction: "india",
    courtLevel: "supreme",
    snippet: "Minor's agreement is void ab initio. Even upon attaining majority, the contract cannot be ratified.",
    citations: 421,
  },
  {
    id: "17",
    title: "Entores Ltd v. Miles Far East Corporation",
    court: "Court of Appeal",
    date: "15 Oct 1955",
    tags: ["Contract Law", "Acceptance", "Communication", "Distance Contracts"],
    relevance: 77,
    jurisdiction: "uk",
    courtLevel: "appellate",
    snippet: "Acceptance must be communicated. Instantaneous communication like telex makes contract at place where acceptance received.",
    citations: 389,
  },
  {
    id: "18",
    title: "D.K. Basu v. State of West Bengal",
    court: "Supreme Court of India",
    date: "18 Dec 1996",
    tags: ["Custodial Violence", "Police Brutality", "Human Rights", "PIL"],
    relevance: 88,
    jurisdiction: "india",
    courtLevel: "supreme",
    snippet: "Guidelines to prevent custodial deaths and torture. Mandatory requirements for arrest and detention procedures.",
    citations: 598,
  },
  {
    id: "19",
    title: "R v. Dudley and Stephens",
    court: "Queen's Bench",
    date: "09 Dec 1884",
    tags: ["Criminal Law", "Necessity", "Murder", "Defence"],
    relevance: 84,
    jurisdiction: "uk",
    courtLevel: "appellate",
    snippet: "Necessity is not a defence to murder. Famous cannibalism case where sailors killed cabin boy for survival.",
    citations: 712,
  },
  {
    id: "20",
    title: "State of Punjab v. Mohinder Singh Chawla",
    court: "Supreme Court of India",
    date: "12 Nov 1996",
    tags: ["Criminal Law", "Bail", "Personal Liberty", "Speedy Trial"],
    relevance: 81,
    jurisdiction: "india",
    courtLevel: "supreme",
    snippet: "Right to speedy trial is fundamental right. Prolonged detention without trial violates Article 21.",
    citations: 467,
  },
  {
    id: "21",
    title: "Williams v. Roffey Bros",
    court: "Court of Appeal",
    date: "02 Feb 1990",
    tags: ["Contract Law", "Consideration", "Practical Benefit", "Variation"],
    relevance: 78,
    jurisdiction: "uk",
    courtLevel: "appellate",
    snippet: "Practical benefit can constitute consideration. Modified traditional rules of consideration in contract variations.",
    citations: 543,
  },
  {
    id: "22",
    title: "Sunil Batra v. Delhi Administration",
    court: "Supreme Court of India",
    date: "20 Feb 1978",
    tags: ["Prison Reforms", "Human Rights", "Prisoners Rights", "PIL"],
    relevance: 85,
    jurisdiction: "india",
    courtLevel: "supreme",
    snippet: "Prisoners retain fundamental rights except those taken away by law. Initiated prison reforms in India.",
    citations: 512,
  },
  {
    id: "23",
    title: "Caparo Industries v. Dickman",
    court: "House of Lords",
    date: "08 Feb 1990",
    tags: ["Negligence", "Duty of Care", "Three-Stage Test", "Economic Loss"],
    relevance: 87,
    jurisdiction: "uk",
    courtLevel: "supreme",
    snippet: "Established three-stage test for duty of care: foreseeability, proximity, and fair/just/reasonable.",
    citations: 892,
  },
  {
    id: "24",
    title: "Nilabati Behera v. State of Orissa",
    court: "Supreme Court of India",
    date: "28 Mar 1993",
    tags: ["Custodial Death", "Compensation", "Article 21", "State Liability"],
    relevance: 86,
    jurisdiction: "india",
    courtLevel: "supreme",
    snippet: "State liable to pay compensation for custodial death. Monetary compensation enforceable under Article 32.",
    citations: 623,
  },
  {
    id: "25",
    title: "Taylor v. Caldwell",
    court: "Queen's Bench",
    date: "03 Jul 1863",
    tags: ["Contract Law", "Frustration", "Impossibility", "Discharge"],
    relevance: 80,
    jurisdiction: "uk",
    courtLevel: "appellate",
    snippet: "Contract frustrated when subject matter destroyed without fault. Music hall fire case established frustration doctrine.",
    citations: 445,
  },
  {
    id: "26",
    title: "Common Cause v. Union of India (Passive Euthanasia)",
    court: "Supreme Court of India",
    date: "09 Mar 2018",
    tags: ["Right to Die", "Euthanasia", "Living Will", "Medical Law"],
    relevance: 94,
    jurisdiction: "india",
    courtLevel: "supreme",
    snippet: "Passive euthanasia and living will recognized. Right to die with dignity is part of Article 21.",
    citations: 712,
  },
  {
    id: "27",
    title: "Pepper v. Hart",
    court: "House of Lords",
    date: "26 Nov 1992",
    tags: ["Statutory Interpretation", "Hansard", "Legislative Intent"],
    relevance: 83,
    jurisdiction: "uk",
    courtLevel: "supreme",
    snippet: "Parliamentary debates (Hansard) can be used to interpret ambiguous legislation.",
    citations: 678,
  },
  {
    id: "28",
    title: "Olga Tellis v. Bombay Municipal Corporation",
    court: "Supreme Court of India",
    date: "10 Jul 1985",
    tags: ["Right to Livelihood", "Pavement Dwellers", "Article 21", "Eviction"],
    relevance: 89,
    jurisdiction: "india",
    courtLevel: "supreme",
    snippet: "Right to livelihood is integral part of right to life. Cannot evict pavement dwellers without alternative.",
    citations: 834,
  },
  {
    id: "29",
    title: "Hunter v. Canary Wharf",
    court: "House of Lords",
    date: "24 Apr 1997",
    tags: ["Tort Law", "Nuisance", "Interference", "Television Reception"],
    relevance: 76,
    jurisdiction: "uk",
    courtLevel: "supreme",
    snippet: "Building that interferes with TV reception is not actionable nuisance. No right to uninterrupted view.",
    citations: 423,
  },
  {
    id: "30",
    title: "Indra Sawhney v. Union of India (Mandal Commission)",
    court: "Supreme Court of India",
    date: "16 Nov 1992",
    tags: ["Reservation", "OBC", "Equality", "Social Justice"],
    relevance: 97,
    jurisdiction: "india",
    courtLevel: "supreme",
    snippet: "50% ceiling on reservations. Creamy layer to be excluded from OBC reservations.",
    citations: 1456,
  },
  {
    id: "31",
    title: "Transfield Shipping v. Mercator Shipping (The Achilleas)",
    court: "House of Lords",
    date: "09 Jul 2008",
    tags: ["Contract Law", "Remoteness", "Damages", "Foreseeability"],
    relevance: 81,
    jurisdiction: "uk",
    courtLevel: "supreme",
    snippet: "Test for remoteness of damage depends on what parties had assumed. Modified Hadley v Baxendale.",
    citations: 534,
  },
  {
    id: "32",
    title: "S.P. Gupta v. Union of India (Judges Transfer Case)",
    court: "Supreme Court of India",
    date: "30 Dec 1981",
    tags: ["Judicial Independence", "Transparency", "RTI", "Public Interest"],
    relevance: 90,
    jurisdiction: "india",
    courtLevel: "supreme",
    snippet: "Public interest litigation and judicial accountability. Foundation for transparency in judiciary.",
    citations: 923,
  },
  {
    id: "33",
    title: "Photo Production v. Securicor",
    court: "House of Lords",
    date: "29 May 1980",
    tags: ["Contract Law", "Exclusion Clause", "Fundamental Breach"],
    relevance: 79,
    jurisdiction: "uk",
    courtLevel: "supreme",
    snippet: "Exclusion clauses can exclude liability even for fundamental breach. Construction depends on contract terms.",
    citations: 567,
  },
  {
    id: "34",
    title: "Hussainara Khatoon v. State of Bihar",
    court: "Supreme Court of India",
    date: "09 Mar 1979",
    tags: ["Undertrial Prisoners", "Speedy Trial", "Legal Aid", "PIL"],
    relevance: 87,
    jurisdiction: "india",
    courtLevel: "supreme",
    snippet: "Right to speedy trial. Highlighted plight of undertrials languishing in jails. Led to legal aid revolution.",
    citations: 645,
  },
  {
    id: "35",
    title: "Fisher v. Bell",
    court: "Queen's Bench",
    date: "24 Mar 1960",
    tags: ["Contract Law", "Offer", "Invitation to Treat", "Display of Goods"],
    relevance: 74,
    jurisdiction: "uk",
    courtLevel: "appellate",
    snippet: "Display of goods in shop window is invitation to treat, not offer. Flick-knife case.",
    citations: 398,
  },
  {
    id: "36",
    title: "NALSA v. Union of India",
    court: "Supreme Court of India",
    date: "15 Apr 2014",
    tags: ["Transgender Rights", "Gender Identity", "Equality", "Dignity"],
    relevance: 95,
    jurisdiction: "india",
    courtLevel: "supreme",
    snippet: "Transgender persons' right to self-identified gender. Landmark judgment for LGBTQ+ rights.",
    citations: 876,
  },
  {
    id: "37",
    title: "Jackson v. Horizon Holidays",
    court: "Court of Appeal",
    date: "15 Feb 1975",
    tags: ["Contract Law", "Damages", "Third Party", "Disappointment"],
    relevance: 77,
    jurisdiction: "uk",
    courtLevel: "appellate",
    snippet: "Can recover damages for disappointment of family members. Exception to privity of contract.",
    citations: 445,
  },
  {
    id: "38",
    title: "Aruna Shanbaug v. Union of India",
    court: "Supreme Court of India",
    date: "07 Mar 2011",
    tags: ["Euthanasia", "Right to Die", "Medical Treatment", "Living Will"],
    relevance: 91,
    jurisdiction: "india",
    courtLevel: "supreme",
    snippet: "Guidelines for passive euthanasia. Precursor to 2018 Common Cause judgment.",
    citations: 734,
  },
  {
    id: "39",
    title: "Foakes v. Beer",
    court: "House of Lords",
    date: "16 Jul 1884",
    tags: ["Contract Law", "Consideration", "Part Payment", "Accord and Satisfaction"],
    relevance: 75,
    jurisdiction: "uk",
    courtLevel: "supreme",
    snippet: "Part payment of debt is not good consideration. Payment of lesser sum cannot discharge larger debt.",
    citations: 512,
  },
  {
    id: "40",
    title: "Justice K.S. Puttaswamy v. Union of India",
    court: "Supreme Court of India",
    date: "24 Aug 2017",
    tags: ["Privacy", "Fundamental Right", "Aadhaar", "Data Protection"],
    relevance: 98,
    jurisdiction: "india",
    courtLevel: "supreme",
    snippet: "Privacy is fundamental right under Article 21. Overruled previous judgments. Led to data protection legislation.",
    citations: 2143,
  },
  {
    id: "41",
    title: "Pharmaceutical Society v. Boots",
    court: "Court of Appeal",
    date: "06 May 1953",
    tags: ["Contract Law", "Offer", "Acceptance", "Self-Service"],
    relevance: 78,
    jurisdiction: "uk",
    courtLevel: "appellate",
    snippet: "Self-service display is invitation to treat. Contract formed at cash register.",
    citations: 623,
  },
  {
    id: "42",
    title: "M.P. Sharma v. Satish Chandra",
    court: "Supreme Court of India",
    date: "14 Dec 1954",
    tags: ["Search and Seizure", "Privacy", "Article 20(3)", "Self-Incrimination"],
    relevance: 80,
    jurisdiction: "india",
    courtLevel: "supreme",
    snippet: "Search and seizure provisions. Later overruled by Puttaswamy on privacy aspect.",
    citations: 456,
  },
  {
    id: "43",
    title: "White v. Jones",
    court: "House of Lords",
    date: "16 Feb 1995",
    tags: ["Negligence", "Solicitor", "Will", "Economic Loss"],
    relevance: 82,
    jurisdiction: "uk",
    courtLevel: "supreme",
    snippet: "Solicitor owes duty of care to beneficiaries. Negligent delay in preparing will.",
    citations: 534,
  },
  {
    id: "44",
    title: "Navtej Singh Johar v. Union of India",
    court: "Supreme Court of India",
    date: "06 Sep 2018",
    tags: ["Section 377", "LGBTQ Rights", "Decriminalization", "Privacy"],
    relevance: 96,
    jurisdiction: "india",
    courtLevel: "supreme",
    snippet: "Section 377 IPC decriminalized for consensual acts. Historic victory for LGBTQ+ community.",
    citations: 1234,
  },
  {
    id: "45",
    title: "Victoria Laundry v. Newman Industries",
    court: "Court of Appeal",
    date: "25 Jan 1949",
    tags: ["Contract Law", "Damages", "Remoteness", "Foreseeability"],
    relevance: 79,
    jurisdiction: "uk",
    courtLevel: "appellate",
    snippet: "Applied Hadley v Baxendale. Loss must be reasonably foreseeable at time of contract.",
    citations: 489,
  },
  {
    id: "46",
    title: "Indian Young Lawyers Association v. State of Kerala (Sabarimala)",
    court: "Supreme Court of India",
    date: "28 Sep 2018",
    tags: ["Gender Equality", "Religious Freedom", "Discrimination", "Temple Entry"],
    relevance: 93,
    jurisdiction: "india",
    courtLevel: "supreme",
    snippet: "Women of all ages allowed entry to Sabarimala temple. Religious practices cannot violate equality.",
    citations: 987,
  },
  {
    id: "47",
    title: "Bolton v. Stone",
    court: "House of Lords",
    date: "10 May 1951",
    tags: ["Negligence", "Reasonable Foreseeability", "Cricket Ball", "Duty of Care"],
    relevance: 81,
    jurisdiction: "uk",
    courtLevel: "supreme",
    snippet: "No negligence where risk was minimal and unlikely. Cricket ball case.",
    citations: 567,
  },
  {
    id: "48",
    title: "Shah Bano Begum v. Mohammed Ahmed Khan",
    court: "Supreme Court of India",
    date: "23 Apr 1985",
    tags: ["Muslim Law", "Maintenance", "CrPC 125", "Women's Rights"],
    relevance: 88,
    jurisdiction: "india",
    courtLevel: "supreme",
    snippet: "Muslim women entitled to maintenance under CrPC. Led to Muslim Women Act 1986.",
    citations: 743,
  },
  {
    id: "49",
    title: "Partridge v. Crittenden",
    court: "Queen's Bench",
    date: "12 Jun 1968",
    tags: ["Contract Law", "Offer", "Advertisement", "Invitation to Treat"],
    relevance: 73,
    jurisdiction: "uk",
    courtLevel: "appellate",
    snippet: "Advertisement in newspaper is invitation to treat, not offer. Bird sale case.",
    citations: 387,
  },
  {
    id: "50",
    title: "Triple Talaq Case (Shayara Bano v. Union of India)",
    court: "Supreme Court of India",
    date: "22 Aug 2017",
    tags: ["Triple Talaq", "Muslim Law", "Gender Justice", "Constitutional Law"],
    relevance: 94,
    jurisdiction: "india",
    courtLevel: "supreme",
    snippet: "Triple talaq declared unconstitutional. Landmark judgment for Muslim women's rights.",
    citations: 1098,
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [results, setResults] = useState(comprehensiveCaseDatabase);
  const [selectedResult, setSelectedResult] = useState<any>(null);
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [searchHistory, setSearchHistory] = useState<Array<{ query: string; timestamp: Date }>>([]);
  const [activeTab, setActiveTab] = useState("search");

  useEffect(() => {
    renderCanvas();
  }, []);

  const handleSearch = (query: string, filters: any) => {
    // Add to search history
    setSearchHistory(prev => [{ query, timestamp: new Date() }, ...prev.slice(0, 9)]);

    // Perform actual search and filtering
    let filteredResults = comprehensiveCaseDatabase;

    // Text search
    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      filteredResults = filteredResults.filter(
        (result) =>
          result.title.toLowerCase().includes(searchTerm) ||
          result.snippet.toLowerCase().includes(searchTerm) ||
          result.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
          result.court.toLowerCase().includes(searchTerm)
      );
    }

    // Apply filters
    if (filters.jurisdiction) {
      filteredResults = filteredResults.filter(
        (result) => result.jurisdiction === filters.jurisdiction
      );
    }

    if (filters.courtLevel) {
      filteredResults = filteredResults.filter(
        (result) => result.courtLevel === filters.courtLevel
      );
    }

    if (filters.dateFrom || filters.dateTo) {
      filteredResults = filteredResults.filter((result) => {
        const caseDate = new Date(result.date);
        const fromDate = filters.dateFrom ? new Date(filters.dateFrom) : new Date("1800-01-01");
        const toDate = filters.dateTo ? new Date(filters.dateTo) : new Date();
        return caseDate >= fromDate && caseDate <= toDate;
      });
    }

    if (filters.tags && filters.tags.length > 0) {
      filteredResults = filteredResults.filter((result) =>
        filters.tags.some((tag: string) => result.tags.includes(tag))
      );
    }

    setResults(filteredResults);
    toast.success(`Found ${filteredResults.length} results for: ${query || "all cases"}`);
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  const toggleBookmark = (result: any) => {
    setBookmarks(prev => {
      const exists = prev.find(b => b.id === result.id);
      if (exists) {
        toast.success("Removed from bookmarks");
        return prev.filter(b => b.id !== result.id);
      } else {
        toast.success("Added to bookmarks");
        return [...prev, result];
      }
    });
  };

  return (
    <div className="h-screen flex flex-col bg-background relative">
      {/* Canvas Background */}
      <canvas
        className="pointer-events-none absolute inset-0 z-0"
        id="canvas"
      />
      
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50"
      >
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Scale className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">JuriSynch</h1>
              <p className="text-xs text-muted-foreground">Legal Research Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex">
          {/* Left Sidebar */}
          <div className="w-64 border-r border-border bg-card/30 backdrop-blur-sm">
            <TabsList className="flex flex-col h-full w-full bg-transparent p-2 gap-1">
              <TabsTrigger value="search" className="w-full justify-start gap-2 data-[state=active]:bg-secondary">
                <Search className="w-4 h-4" />
                Search
              </TabsTrigger>
              <TabsTrigger value="analytics" className="w-full justify-start gap-2 data-[state=active]:bg-secondary">
                <BarChart3 className="w-4 h-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="network" className="w-full justify-start gap-2 data-[state=active]:bg-secondary">
                <Network className="w-4 h-4" />
                Citations
              </TabsTrigger>
              <TabsTrigger value="bookmarks" className="w-full justify-start gap-2 data-[state=active]:bg-secondary">
                <Bookmark className="w-4 h-4" />
                Bookmarks
                {bookmarks.length > 0 && (
                  <span className="ml-auto text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5">
                    {bookmarks.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="history" className="w-full justify-start gap-2 data-[state=active]:bg-secondary">
                <History className="w-4 h-4" />
                History
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex overflow-hidden">
            <TabsContent value="search" className="flex-1 flex m-0">
              <div className="w-80 flex-shrink-0 overflow-hidden">
                <SearchPanel onSearch={handleSearch} />
              </div>
              <div className="flex-1 overflow-hidden">
                <ResultsViewer
                  results={results}
                  onSelectResult={(result) => {
                    setSelectedResult(result);
                    toggleBookmark(result);
                  }}
                />
              </div>
              <div className="w-96 flex-shrink-0 overflow-hidden">
                <DossierPanel />
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="flex-1 m-0 overflow-hidden">
              <AnalyticsDashboard 
                totalCases={comprehensiveCaseDatabase.length}
                searchHistory={searchHistory}
                bookmarks={bookmarks}
              />
            </TabsContent>

            <TabsContent value="network" className="flex-1 m-0 overflow-hidden">
              <CitationNetwork cases={results.slice(0, 20)} />
            </TabsContent>

            <TabsContent value="bookmarks" className="flex-1 m-0 overflow-hidden">
              <BookmarksPanel 
                bookmarks={bookmarks}
                onRemove={toggleBookmark}
                onSelect={setSelectedResult}
              />
            </TabsContent>

            <TabsContent value="history" className="flex-1 m-0 overflow-hidden p-6">
              <div className="h-full bg-card rounded-lg border border-border p-6">
                <h2 className="text-2xl font-bold mb-6">Search History</h2>
                <div className="space-y-3">
                  {searchHistory.length === 0 ? (
                    <p className="text-muted-foreground">No search history yet</p>
                  ) : (
                    searchHistory.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="p-4 bg-background rounded-lg border border-border hover:border-secondary transition-colors cursor-pointer"
                        onClick={() => handleSearch(item.query, {})}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <History className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{item.query}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {item.timestamp.toLocaleString()}
                          </span>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Settings Modal */}
      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
}
