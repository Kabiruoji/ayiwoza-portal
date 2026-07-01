import { useState, useEffect, useCallback, useRef, Component } from "react";

const SUPABASE_URL="https://pscchcdqdlcoeoiuohvd.supabase.co";
const SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzY2NoY2RxZGxjb2VvaXVvaHZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2ODM1MDIsImV4cCI6MjA5NzI1OTUwMn0.YRQX28PdPj_JeNSDGCpuqxwqwKXqNwNL0trALBsGQr4";
const SB_H={"apikey":SUPABASE_ANON_KEY,"Authorization":`Bearer ${SUPABASE_ANON_KEY}`,"Content-Type":"application/json","Prefer":"resolution=merge-duplicates"};
async function sbGet(key){const r=await fetch(`${SUPABASE_URL}/rest/v1/ayiwoza_kv?key=eq.${encodeURIComponent(key)}&select=value`,{headers:{"apikey":SUPABASE_ANON_KEY,"Authorization":`Bearer ${SUPABASE_ANON_KEY}`}});if(!r.ok)throw new Error("get failed");const d=await r.json();return d.length?d[0].value:null;}
async function sbSet(key,value){await fetch(`${SUPABASE_URL}/rest/v1/ayiwoza_kv`,{method:"POST",headers:SB_H,body:JSON.stringify({key,value,updated_at:new Date().toISOString()})});}

class ErrorBoundary extends Component {
  constructor(p){super(p);this.state={err:null};}
  static getDerivedStateFromError(e){return{err:e};}
  render(){
    if(this.state.err) return (
      <div style={{padding:20,background:"#1B2D6B",minHeight:"100vh",color:"#fff",fontFamily:"monospace"}}>
        <h2 style={{color:"#FF8A80"}}>⚠️ Error</h2>
        <pre style={{whiteSpace:"pre-wrap",background:"rgba(0,0,0,.3)",padding:12,borderRadius:8}}>{String(this.state.err)}</pre>
        <button onClick={()=>window.location.reload()} style={{marginTop:12,background:"#C9962B",border:"none",borderRadius:8,padding:"10px 20px",fontWeight:800,cursor:"pointer"}}>Reload</button>
      </div>
    );
    return this.props.children;
  }
}

const B={navy:"#1B2D6B",navyDk:"#111E4A",blue:"#1565C0",green:"#2E7D32",gold:"#C9962B",red:"#C0392B",bg:"#F5F7FA",border:"#E3E8F0",textMid:"#4A5568",textSub:"#8A96A8"};

const MEMBERS0=[
  {id:"AYI0001",name:"SHUAIBU KABIRU ADOKWE",role:"Chairman",phone:"08148044941",joined:"June 2026",password:"Adokwe@2026",isAdmin:true,photo:null,email:""},
  {id:"AYI0002",name:"DALHATU TANKO SHUAIBU",role:"Deputy Chairman",phone:"08065582074",joined:"June 2026",password:"Dalhatu@2026",isAdmin:false,photo:null,email:""},
  {id:"AYI0003",name:"ALI MUSA OGASHUWA",role:"Secretary",phone:"08140049900",joined:"June 2026",password:"Ali@2026",isAdmin:true,photo:null,email:""},
  {id:"AYI0004",name:"SULEIMAN EBENYA",role:"Treasurer",phone:"07066772617",joined:"June 2026",password:"Ebenya@2026",isAdmin:true,photo:null,email:""},
  {id:"AYI0005",name:"IBRAHIM ABDULJALAL",role:"Member",phone:"08143060635",joined:"June 2026",password:"Ibrahim@2026",isAdmin:false,photo:null,email:""},
  {id:"AYI0006",name:"HARUNA MUHAMMAD AWOSE",role:"Member",phone:"08146408138",joined:"June 2026",password:"Haruna1@2026",isAdmin:false,photo:null,email:""},
  {id:"AYI0007",name:"ISMAILA UMAR",role:"Member",phone:"07036131693",joined:"June 2026",password:"Ismaila@2026",isAdmin:false,photo:null,email:""},
  {id:"AYI0008",name:"MU'AWIYA KASIMU",role:"Member",phone:"08069676025",joined:"June 2026",password:"Muawiya@2026",isAdmin:false,photo:null,email:""},
  {id:"AYI0009",name:"HARUNA MUHAMMAD",role:"Member",phone:"07063389030",joined:"June 2026",password:"Haruna2@2026",isAdmin:false,photo:null,email:""},
  {id:"AYI0010",name:"MUHAMMAD EGWA",role:"Member",phone:"09061492722",joined:"June 2026",password:"Egwa@2026",isAdmin:false,photo:null,email:""},
  {id:"AYI0011",name:"NASIRU RUFAI",role:"Member",phone:"07043504718",joined:"June 2026",password:"Nasiru@2026",isAdmin:false,photo:null,email:""},
  {id:"AYI0012",name:"ABDULKARIM ISMAILA",role:"Member",phone:"07043131135",joined:"June 2026",password:"Abdulkarim@2026",isAdmin:false,photo:null,email:""},
  {id:"AYI0013",name:"MUHAMMAD ISMAILA",role:"Member",phone:"08037597112",joined:"June 2026",password:"Muhammed@2026",isAdmin:false,photo:null,email:""},
  {id:"AYI0014",name:"AUDU ABDULLAHI APESHI",role:"Member",phone:"07030375853",joined:"June 2026",password:"Audu@2026",isAdmin:false,photo:null,email:""},
  {id:"AYI0015",name:"ABDUL OMENYA",role:"Member",phone:"08066752710",joined:"June 2026",password:"Abdul@2026",isAdmin:false,photo:null,email:""},
];

const MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
const BULK_ITEMS=["Rice","Beans","Maggi","Sugar","Milk","Bournvita","Palm Oil","Groundnut Oil","Other"];
const CTYPES=[
  {key:"savings",label:"Member Savings",icon:"💰",color:B.green},
  {key:"monthly",label:"Monthly Dues",icon:"📅",color:B.blue},
];

const fmt=n=>Number(n||0).toLocaleString("en-NG",{minimumFractionDigits:2,maximumFractionDigits:2});
const ini=n=>n.split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase();
const roleColor=r=>({Chairman:B.navy,"Deputy Chairman":B.blue,Secretary:B.green,Treasurer:B.gold}[r]||B.navy);
const today=()=>new Date().toLocaleDateString("en-NG");
const sSt=s=>({approved:{bg:"#E8F5E9",c:B.green},rejected:{bg:"#FDECEC",c:B.red},pending:{bg:"#FFF3E0",c:"#E65100"}}[s]||{bg:"#F0F1F3",c:B.textSub});
const useIsDesktop=()=>{const[d,setD]=useState(window.innerWidth>=900);useEffect(()=>{const h=()=>setD(window.innerWidth>=900);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h);},[]);return d;};

// ── Small UI ──────────────────────────────────────────────────────────────────
const Av=({name,role,photo,size=38})=>photo
  ?<img src={photo} alt={name} style={{width:size,height:size,borderRadius:"50%",objectFit:"cover",flexShrink:0,border:"2px solid rgba(201,150,43,.5)"}}/>
  :<div style={{width:size,height:size,borderRadius:"50%",background:roleColor(role),display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*.3,fontWeight:800,color:"#fff",flexShrink:0,border:"2px solid rgba(201,150,43,.4)"}}>{ini(name)}</div>;

const Badge=({text,color=B.navy,bg="#E8EBF5"})=>(
  <span style={{background:bg,color,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,whiteSpace:"nowrap",letterSpacing:.3}}>{text}</span>
);

const Fld=({label,children})=>(
  <div style={{marginBottom:12}}>
    <label style={{display:"block",fontSize:11,fontWeight:700,color:B.textMid,marginBottom:4,textTransform:"uppercase",letterSpacing:.5}}>{label}</label>
    {children}
  </div>
);

const IS={width:"100%",background:"#F8F9FC",border:`1.5px solid ${B.border}`,borderRadius:9,padding:"9px 12px",fontSize:14,outline:"none",color:"#1a1a1a",boxSizing:"border-box",fontFamily:"inherit"};

const Btns=({onSave,onClose,label="Save"})=>(
  <div style={{display:"flex",gap:8,marginTop:16}}>
    <button onClick={onClose} style={{flex:1,background:"transparent",border:`1.5px solid ${B.border}`,borderRadius:9,padding:11,cursor:"pointer",fontSize:13,fontWeight:700,color:B.textMid}}>Cancel</button>
    <button onClick={onSave} style={{flex:2,background:`linear-gradient(135deg,${B.navy},${B.blue})`,color:"#fff",border:"none",borderRadius:9,padding:11,cursor:"pointer",fontSize:13,fontWeight:800}}>{label}</button>
  </div>
);

const SecHead=({title,right})=>(
  <div style={{padding:"10px 14px",background:B.bg,borderBottom:`1.5px solid ${B.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
    <span style={{fontWeight:800,color:B.navy,fontSize:13,borderLeft:`3px solid ${B.gold}`,paddingLeft:8}}>{title}</span>
    {right}
  </div>
);

const Card=({children,mb=12})=>(
  <div style={{background:"#fff",borderRadius:14,border:`1.5px solid ${B.border}`,overflow:"hidden",marginBottom:mb}}>{children}</div>
);

const StatCard=({icon,label,value,color})=>(
  <div style={{background:"#fff",borderRadius:12,padding:11,border:`1.5px solid ${B.border}`}}>
    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
      <div style={{width:26,height:26,borderRadius:7,background:`${color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>{icon}</div>
      <span style={{fontSize:9.5,color:B.textSub,fontWeight:700,textTransform:"uppercase",letterSpacing:.3,lineHeight:1.2}}>{label}</span>
    </div>
    <p style={{margin:0,fontSize:14,fontWeight:800,color}}>{value}</p>
  </div>
);

const PBtn=({onClick,children,small=false})=>(
  <button onClick={onClick} style={{background:`linear-gradient(135deg,${B.navy},${B.blue})`,color:"#fff",border:"none",borderRadius:9,padding:small?"7px 13px":"10px 16px",fontSize:small?12:13,fontWeight:800,cursor:"pointer",whiteSpace:"nowrap"}}>{children}</button>
);

function Toast({msg,type}){
  const c={success:{bg:"#E8F5E9",c:B.green,i:"✓"},error:{bg:"#FDECEC",c:B.red,i:"✗"},warn:{bg:"#FDF6E3",c:"#7A5800",i:"⚠"}}[type]||{bg:"#E8F5E9",c:B.green,i:"✓"};
  return <div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",zIndex:999,background:c.bg,color:c.c,padding:"10px 20px",borderRadius:25,fontSize:13,fontWeight:700,boxShadow:"0 8px 24px rgba(0,0,0,.2)",whiteSpace:"nowrap"}}>{c.i} {msg}</div>;
}

// Inline delete-confirm block used inside modals (avoids window.confirm,
// which is blocked/silently auto-dismissed in some embedded webviews).
function DeleteConfirmInline({label="Delete this? This cannot be undone.",onConfirm,onCancel}){
  return (
    <div style={{background:"#FDECEC",border:`1.5px solid ${B.red}`,borderRadius:9,padding:12,marginTop:10}}>
      <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:B.red}}>{label}</p>
      <div style={{display:"flex",gap:8}}>
        <button onClick={onCancel} style={{flex:1,background:"transparent",border:`1.5px solid ${B.border}`,borderRadius:8,padding:9,cursor:"pointer",fontSize:12,fontWeight:700,color:B.textMid}}>Cancel</button>
        <button onClick={onConfirm} style={{flex:1,background:B.red,color:"#fff",border:"none",borderRadius:8,padding:9,cursor:"pointer",fontSize:12,fontWeight:800}}>Yes, Delete</button>
      </div>
    </div>
  );
}

function Modal({title,onClose,children}){
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(17,30,74,.5)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:300}} onClick={onClose}>
      <div style={{background:"#fff",borderRadius:"20px 20px 0 0",width:"100%",maxWidth:520,maxHeight:"90vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
        <div style={{width:40,height:4,background:"#ddd",borderRadius:2,margin:"12px auto 0"}}/>
        <div style={{background:`linear-gradient(135deg,${B.navyDk},${B.blue})`,padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontWeight:800,fontSize:14,color:"#fff"}}>{title}</span>
          <button onClick={onClose} style={{background:"rgba(255,255,255,.2)",border:"none",width:28,height:28,borderRadius:"50%",cursor:"pointer",color:"#fff",fontSize:15}}>×</button>
        </div>
        <div style={{padding:18}}>{children}</div>
      </div>
    </div>
  );
}

function PhotoPicker({photo,onPhoto,size=80}){
  const id=useRef("pp-"+Math.random().toString(36).slice(2));
  const pick=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>onPhoto(ev.target.result);r.readAsDataURL(f);e.target.value="";};
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8,marginBottom:16}}>
      <label htmlFor={id.current} style={{cursor:"pointer",position:"relative",display:"inline-block"}}>
        {photo
          ?<img src={photo} alt="profile" style={{width:size,height:size,borderRadius:"50%",objectFit:"cover",border:`3px solid ${B.gold}`,display:"block"}}/>
          :<div style={{width:size,height:size,borderRadius:"50%",background:`linear-gradient(135deg,${B.navy},${B.blue})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*.35,border:`3px solid ${B.gold}`}}>📷</div>}
        <div style={{position:"absolute",bottom:0,right:0,background:B.gold,borderRadius:"50%",width:24,height:24,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,border:"2px solid #fff"}}>✏️</div>
      </label>
      <span style={{fontSize:11,color:B.textSub,fontWeight:600}}>Tap to {photo?"change":"upload"} photo</span>
      <input id={id.current} type="file" accept="image/*" style={{display:"none"}} onChange={pick}/>
    </div>
  );
}

const Logo=({size=36})=>(
  <svg width={size} height={size*.9} viewBox="0 0 120 108" fill="none">
    <circle cx="30" cy="30" r="6" fill="#C9962B"/>
    <path d="M20 55 Q24 38 30 36 Q36 38 40 55" fill="#C9962B"/>
    <circle cx="90" cy="30" r="6" fill="#43A047"/>
    <path d="M80 55 Q84 38 90 36 Q96 38 100 55" fill="#43A047"/>
    <defs><linearGradient id="g1" x1="60" y1="10" x2="60" y2="70" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#1E88E5"/><stop offset="100%" stopColor="#1B2D6B"/></linearGradient></defs>
    <rect x="54" y="30" width="12" height="38" rx="3" fill="url(#g1)"/>
    <polygon points="60,8 46,30 74,30" fill="url(#g1)"/>
    <line x1="22" y1="44" x2="14" y2="36" stroke="#C9962B" strokeWidth="3.5" strokeLinecap="round"/>
    <line x1="38" y1="44" x2="44" y2="36" stroke="#C9962B" strokeWidth="3.5" strokeLinecap="round"/>
    <line x1="82" y1="44" x2="76" y2="36" stroke="#43A047" strokeWidth="3.5" strokeLinecap="round"/>
    <line x1="98" y1="44" x2="104" y2="36" stroke="#43A047" strokeWidth="3.5" strokeLinecap="round"/>
    <path d="M14 70 Q60 88 106 70" stroke="#43A047" strokeWidth="5" fill="none" strokeLinecap="round"/>
  </svg>
);

// ── Modals ────────────────────────────────────────────────────────────────────

function AddContribModal({members,contribs,saveC,closeModal,showToast,ctype}){
  const ct=CTYPES.find(t=>t.key===ctype)||CTYPES[0];
  const[mid,setMid]=useState(""); const[mon,setMon]=useState(""); const[yr,setYr]=useState(new Date().getFullYear()); const[amt,setAmt]=useState("");
  const save=()=>{
    if(!mid||!mon||!amt){showToast("Fill all fields","error");return;}
    if(Number(amt)<=0){showToast("Enter a valid amount","error");return;}
    const nc={...contribs,[mid]:[...(contribs[mid]||[]),{id:Date.now(),type:ct.key,amount:Number(amt),month:mon,year:Number(yr),date:today(),contributorId:mid}]};
    saveC(nc);closeModal();showToast("Recorded ✓");
  };
  return (
    <Modal title={`${ct.icon} Record ${ct.label}`} onClose={closeModal}>
      <Fld label="Member"><select style={IS} value={mid} onChange={e=>setMid(e.target.value)}><option value="">Select member…</option>{members.map(m=><option key={m.id} value={m.id}>{m.name} ({m.id})</option>)}</select></Fld>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <Fld label="Month"><select style={IS} value={mon} onChange={e=>setMon(e.target.value)}><option value="">Month…</option>{MONTHS.map(m=><option key={m}>{m}</option>)}</select></Fld>
        <Fld label="Year"><input style={IS} type="number" value={yr} onChange={e=>setYr(e.target.value)}/></Fld>
      </div>
      <Fld label="Amount (₦)"><input style={IS} type="number" value={amt} onChange={e=>setAmt(e.target.value)} placeholder="0"/></Fld>
      <Btns onSave={save} onClose={closeModal} label="Save"/>
    </Modal>
  );
}

function EditContribModal({record,members,contribs,saveC,closeModal,showToast}){
  const ct=CTYPES.find(t=>t.key===record.type)||CTYPES[0];
  const mid=record.mid||record.contributorId;
  const[mon,setMon]=useState(record.month); const[yr,setYr]=useState(record.year); const[amt,setAmt]=useState(record.amount);
  const[confirmingDelete,setConfirmingDelete]=useState(false);
  const save=()=>{
    const updated={...record,month:mon,year:Number(yr),amount:Number(amt)};
    saveC({...contribs,[mid]:(contribs[mid]||[]).map(c=>c.id===record.id?updated:c)});
    closeModal();showToast("Updated ✓");
  };
  const del=()=>{
    saveC({...contribs,[mid]:(contribs[mid]||[]).filter(c=>c.id!==record.id)});
    closeModal();showToast("Deleted","warn");
  };
  return (
    <Modal title={`✏️ Edit ${ct.label}`} onClose={closeModal}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <Fld label="Month"><select style={IS} value={mon} onChange={e=>setMon(e.target.value)}>{MONTHS.map(m=><option key={m}>{m}</option>)}</select></Fld>
        <Fld label="Year"><input style={IS} type="number" value={yr} onChange={e=>setYr(e.target.value)}/></Fld>
      </div>
      <Fld label="Amount (₦)"><input style={IS} type="number" value={amt} onChange={e=>setAmt(e.target.value)}/></Fld>
      {!confirmingDelete?(
        <div style={{display:"flex",gap:8,marginTop:16}}>
          <button onClick={()=>setConfirmingDelete(true)} style={{flex:1,background:"transparent",border:`1.5px solid ${B.red}`,borderRadius:9,padding:11,cursor:"pointer",fontSize:13,fontWeight:700,color:B.red}}>🗑</button>
          <button onClick={closeModal} style={{flex:1,background:"transparent",border:`1.5px solid ${B.border}`,borderRadius:9,padding:11,cursor:"pointer",fontSize:13,fontWeight:700,color:B.textMid}}>Cancel</button>
          <button onClick={save} style={{flex:2,background:`linear-gradient(135deg,${B.navy},${B.blue})`,color:"#fff",border:"none",borderRadius:9,padding:11,cursor:"pointer",fontSize:13,fontWeight:800}}>Save</button>
        </div>
      ):(
        <DeleteConfirmInline label="Delete this record? This cannot be undone." onConfirm={del} onCancel={()=>setConfirmingDelete(false)}/>
      )}
    </Modal>
  );
}

function AddLoanModal({members,loans,saveL,closeModal,showToast,loanPool,totOut,getOut,preselect=null}){
  const[mid,setMid]=useState(preselect||""); const[amt,setAmt]=useState(""); const[mo,setMo]=useState(10);
  const available=Math.max(0,loanPool-totOut);
  const save=()=>{
    if(!mid||!amt){showToast("Fill all fields","error");return;}
    if(getOut(mid)>0){showToast("Member has active loan","error");return;}
    if(Number(amt)>available){showToast("Insufficient funds","error");return;}
    const profit=Math.round(Number(amt)*.05);
    saveL([...loans,{id:Date.now(),memberId:mid,amount:Number(amt),profit,balance:Number(amt),months:Math.min(10,Number(mo)),payments:[],status:"active",date:today()}]);
    closeModal();showToast("Loan approved ✓");
  };
  return (
    <Modal title="🏦 Approve Loan" onClose={closeModal}>
      <div style={{background:"#FFF3E0",borderRadius:9,padding:"10px 12px",marginBottom:12,fontSize:12,color:"#E65100",border:"1px solid #FFE0B2"}}>Available: <strong style={{color:B.green}}>₦{fmt(available)}</strong> · 5% admin charge</div>
      <Fld label="Member"><select style={IS} value={mid} onChange={e=>setMid(e.target.value)}><option value="">Select…</option>{members.filter(m=>getOut(m.id)===0).map(m=><option key={m.id} value={m.id}>{m.name}</option>)}</select></Fld>
      <Fld label="Amount (₦)"><input style={IS} type="number" value={amt} onChange={e=>setAmt(e.target.value)} placeholder="50000"/></Fld>
      <Fld label="Repayment Months (max 10)"><input style={IS} type="number" min={1} max={10} value={mo} onChange={e=>setMo(Math.min(10,e.target.value))}/></Fld>
      {Number(amt)>0&&(
        <div style={{background:"#E8F5E9",borderRadius:9,padding:10,fontSize:12,marginBottom:4,border:"1px solid #C8E6C9"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,textAlign:"center"}}>
            {[["5% Charge",`₦${fmt(amt*.05)}`,"#7A5800"],["Receives",`₦${fmt(amt-amt*.05)}`,B.green],["Repays",`₦${fmt(amt)}`,B.navy]].map(([l,v,c])=>(
              <div key={l} style={{background:"#fff",borderRadius:7,padding:8}}>
                <p style={{margin:0,fontSize:10,color:B.textSub}}>{l}</p>
                <p style={{margin:"3px 0 0",fontWeight:800,color:c,fontSize:12}}>{v}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <Btns onSave={save} onClose={closeModal} label="Approve"/>
    </Modal>
  );
}

function LoanPayModal({loan,members,loans,saveL,closeModal,showToast}){
  const[amt,setAmt]=useState("");
  const mn=members.find(m=>m.id===loan.memberId)?.name||"";
  const save=()=>{
    if(!amt||Number(amt)<=0){showToast("Enter amount","error");return;}
    const ul=loans.map(l=>{
      if(l.id!==loan.id)return l;
      const nb=Math.max(0,l.balance-Number(amt));
      return{...l,balance:nb,payments:[...(l.payments||[]),{amount:Number(amt),date:today()}],status:nb===0?"repaid":"active"};
    });
    saveL(ul);closeModal();showToast("Payment saved ✓");
  };
  return (
    <Modal title="💳 Loan Payment" onClose={closeModal}>
      <div style={{background:B.bg,borderRadius:9,padding:12,marginBottom:12,border:`1px solid ${B.border}`}}>
        <p style={{margin:0,fontSize:13}}>Borrower: <strong style={{color:B.navy}}>{mn}</strong></p>
        <p style={{margin:"5px 0 0",fontSize:13}}>Outstanding: <strong style={{color:B.red,fontSize:16}}>₦{fmt(loan.balance)}</strong></p>
      </div>
      <Fld label="Payment Amount (₦)"><input style={IS} type="number" value={amt} onChange={e=>setAmt(e.target.value)}/></Fld>
      <Btns onSave={save} onClose={closeModal} label="Save Payment"/>
    </Modal>
  );
}

function EditLoanModal({loan,members,loans,saveL,closeModal,showToast}){
  const[amt,setAmt]=useState(loan.amount); const[bal,setBal]=useState(loan.balance);
  const[mo,setMo]=useState(loan.months); const[status,setStatus]=useState(loan.status);
  const[confirmingDelete,setConfirmingDelete]=useState(false);
  const mn=members.find(m=>m.id===loan.memberId)?.name||"";
  const save=()=>{
    const profit=Math.round(Number(amt)*.05);
    saveL(loans.map(l=>l.id===loan.id?{...l,amount:Number(amt),balance:Number(bal),months:Number(mo),status,profit}:l));
    closeModal();showToast("Loan updated ✓");
  };
  const del=()=>{
    saveL(loans.filter(l=>l.id!==loan.id));
    closeModal();showToast("Deleted","warn");
  };
  return (
    <Modal title="✏️ Edit Loan" onClose={closeModal}>
      <div style={{background:B.bg,borderRadius:9,padding:10,marginBottom:12,fontSize:12,border:`1px solid ${B.border}`}}>Borrower: <strong style={{color:B.navy}}>{mn}</strong></div>
      <Fld label="Original Amount (₦)"><input style={IS} type="number" value={amt} onChange={e=>setAmt(e.target.value)}/></Fld>
      <Fld label="Outstanding Balance (₦)"><input style={IS} type="number" value={bal} onChange={e=>setBal(e.target.value)}/></Fld>
      <Fld label="Repayment Months"><input style={IS} type="number" min={1} max={10} value={mo} onChange={e=>setMo(e.target.value)}/></Fld>
      <Fld label="Status"><select style={IS} value={status} onChange={e=>setStatus(e.target.value)}><option value="active">Active</option><option value="repaid">Repaid</option></select></Fld>
      {!confirmingDelete?(
        <div style={{display:"flex",gap:8,marginTop:16}}>
          <button onClick={()=>setConfirmingDelete(true)} style={{flex:1,background:"transparent",border:`1.5px solid ${B.red}`,borderRadius:9,padding:11,cursor:"pointer",fontSize:13,fontWeight:700,color:B.red}}>🗑</button>
          <button onClick={closeModal} style={{flex:1,background:"transparent",border:`1.5px solid ${B.border}`,borderRadius:9,padding:11,cursor:"pointer",fontSize:13,fontWeight:700,color:B.textMid}}>Cancel</button>
          <button onClick={save} style={{flex:2,background:`linear-gradient(135deg,${B.navy},${B.blue})`,color:"#fff",border:"none",borderRadius:9,padding:11,cursor:"pointer",fontSize:13,fontWeight:800}}>Save</button>
        </div>
      ):(
        <DeleteConfirmInline label="Delete this loan record? This cannot be undone." onConfirm={del} onCancel={()=>setConfirmingDelete(false)}/>
      )}
    </Modal>
  );
}

function NewEventModal({members,events,saveE,closeModal,showToast}){
  const[recipientId,setRecipientId]=useState(""); const[etype,setEtype]=useState("marriage");
  const[datePaid,setDatePaid]=useState(""); const[customName,setCustomName]=useState("");
  const save=()=>{
    if(!recipientId){showToast("Select recipient","error");return;}
    const recipient=members.find(m=>m.id===recipientId);
    const name=customName.trim()||`${etype==="marriage"?"Marriage":"Naming Ceremony"} of ${recipient?.name.split(" ")[0]}`;
    saveE([...events,{id:Date.now(),etype,name,recipientId,date:datePaid||today(),payments:[]}]);
    closeModal();showToast("Event created ✓");
  };
  return (
    <Modal title="🎉 New Social Event" onClose={closeModal}>
      <Fld label="Recipient (Who is being celebrated)">
        <select style={IS} value={recipientId} onChange={e=>setRecipientId(e.target.value)}>
          <option value="">Select member…</option>
          {members.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
      </Fld>
      <Fld label="Event Type">
        <select style={IS} value={etype} onChange={e=>setEtype(e.target.value)}>
          <option value="marriage">💍 Marriage Gift</option>
          <option value="naming">👶 Naming Gift</option>
        </select>
      </Fld>
      <Fld label="Event Name (optional)">
        <input style={IS} value={customName} onChange={e=>setCustomName(e.target.value)} placeholder={`e.g. ${etype==="marriage"?"Marriage":"Naming"} of ${recipientId?members.find(m=>m.id===recipientId)?.name.split(" ")[0]||"Member":"Member"}`}/>
      </Fld>
      <Fld label="Date Paid"><input style={IS} type="date" value={datePaid} onChange={e=>setDatePaid(e.target.value)}/></Fld>
      <Btns onSave={save} onClose={closeModal} label="Create Event"/>
    </Modal>
  );
}

function EventPayModal({event,member,events,saveE,closeModal,showToast}){
  const[amt,setAmt]=useState("");
  const save=()=>{
    if(!amt||Number(amt)<=0){showToast("Enter amount","error");return;}
    if(event.payments.some(p=>p.memberId===member.id)){showToast("Already paid","warn");return;}
    saveE(events.map(ev=>ev.id!==event.id?ev:{...ev,payments:[...ev.payments,{memberId:member.id,amount:Number(amt),date:today()}]}));
    closeModal();showToast("Payment recorded ✓");
  };
  return (
    <Modal title="💳 Record Payment" onClose={closeModal}>
      <div style={{background:B.bg,borderRadius:9,padding:12,marginBottom:12,border:`1px solid ${B.border}`}}>
        <p style={{margin:0,fontSize:13}}>Event: <strong>{event.name}</strong></p>
        <p style={{margin:"4px 0 0",fontSize:13}}>Member: <strong>{member.name}</strong></p>
      </div>
      <Fld label="Amount (₦)"><input style={IS} type="number" value={amt} onChange={e=>setAmt(e.target.value)} placeholder="0"/></Fld>
      <Btns onSave={save} onClose={closeModal} label="Save"/>
    </Modal>
  );
}

function EditEventPayModal({event,payment,events,saveE,members,closeModal,showToast}){
  const[amt,setAmt]=useState(payment.amount);
  const[confirmingDelete,setConfirmingDelete]=useState(false);
  const mn=members.find(m=>m.id===payment.memberId)?.name||"";
  const save=()=>{
    saveE(events.map(ev=>ev.id!==event.id?ev:{...ev,payments:ev.payments.map(p=>p.memberId===payment.memberId?{...p,amount:Number(amt)}:p)}));
    closeModal();showToast("Updated ✓");
  };
  const del=()=>{
    saveE(events.map(ev=>ev.id!==event.id?ev:{...ev,payments:ev.payments.filter(p=>p.memberId!==payment.memberId)}));
    closeModal();showToast("Removed","warn");
  };
  return (
    <Modal title="✏️ Edit Payment" onClose={closeModal}>
      <div style={{background:B.bg,borderRadius:9,padding:10,marginBottom:12,fontSize:12,border:`1px solid ${B.border}`}}>
        <p style={{margin:0}}>Event: <strong>{event.name}</strong></p>
        <p style={{margin:"4px 0 0"}}>Member: <strong>{mn}</strong></p>
      </div>
      <Fld label="Amount (₦)"><input style={IS} type="number" value={amt} onChange={e=>setAmt(e.target.value)}/></Fld>
      {!confirmingDelete?(
        <div style={{display:"flex",gap:8,marginTop:16}}>
          <button onClick={()=>setConfirmingDelete(true)} style={{flex:1,background:"transparent",border:`1.5px solid ${B.red}`,borderRadius:9,padding:11,cursor:"pointer",fontSize:13,fontWeight:700,color:B.red}}>🗑</button>
          <button onClick={closeModal} style={{flex:1,background:"transparent",border:`1.5px solid ${B.border}`,borderRadius:9,padding:11,cursor:"pointer",fontSize:13,fontWeight:700,color:B.textMid}}>Cancel</button>
          <button onClick={save} style={{flex:2,background:`linear-gradient(135deg,${B.navy},${B.blue})`,color:"#fff",border:"none",borderRadius:9,padding:11,cursor:"pointer",fontSize:13,fontWeight:800}}>Save</button>
        </div>
      ):(
        <DeleteConfirmInline label="Remove this payment? This cannot be undone." onConfirm={del} onCancel={()=>setConfirmingDelete(false)}/>
      )}
    </Modal>
  );
}

function AddBulkModal({members,bulkOrders,saveB,closeModal,showToast}){
  const[title,setTitle]=useState(""); const[notes,setNotes]=useState(""); const[items,setItems]=useState([{item:"",total:"",qty:""}]);
  const upd=(i,k,v)=>setItems(items.map((it,idx)=>idx===i?{...it,[k]:v}:it));
  const save=()=>{
    if(!title){showToast("Enter order title","error");return;}
    const valid=items.filter(it=>it.item&&it.total);
    if(!valid.length){showToast("Add at least one item","error");return;}
    const grandTotal=valid.reduce((s,it)=>s+Number(it.total),0);
    saveB([...bulkOrders,{id:Date.now(),title,items:valid,grandTotal,perMember:Math.round(grandTotal/members.length),notes,date:today()}]);
    closeModal();showToast("Order saved ✓");
  };
  return (
    <Modal title="🛒 New Bulk Purchase" onClose={closeModal}>
      <Fld label="Order Title"><input style={IS} value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Ramadan Bulk 2026"/></Fld>
      {items.map((it,i)=>(
        <div key={i} style={{border:`1.5px solid ${B.border}`,borderRadius:10,padding:10,marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <span style={{fontSize:11,fontWeight:700,color:B.textSub}}>Item {i+1}</span>
            {items.length>1&&<button onClick={()=>setItems(items.filter((_,idx)=>idx!==i))} style={{background:"transparent",border:"none",color:B.red,cursor:"pointer",fontWeight:800}}>✕</button>}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <Fld label="Item"><select style={IS} value={it.item} onChange={e=>upd(i,"item",e.target.value)}><option value="">Select…</option>{BULK_ITEMS.map(b=><option key={b}>{b}</option>)}</select></Fld>
            <Fld label="Total (₦)"><input style={IS} type="number" value={it.total} onChange={e=>upd(i,"total",e.target.value)} placeholder="0"/></Fld>
          </div>
          <Fld label="Qty/Unit"><input style={IS} value={it.qty} onChange={e=>upd(i,"qty",e.target.value)} placeholder="e.g. 50kg"/></Fld>
        </div>
      ))}
      {items.length<5&&<button onClick={()=>setItems([...items,{item:"",total:"",qty:""}])} style={{width:"100%",background:B.bg,border:`1.5px dashed ${B.border}`,borderRadius:9,padding:9,cursor:"pointer",fontSize:13,fontWeight:700,color:B.navy,marginBottom:12}}>+ Add Item ({items.length}/5)</button>}
      <Fld label="Notes"><textarea style={{...IS,resize:"none"}} rows={2} value={notes} onChange={e=>setNotes(e.target.value)}/></Fld>
      <Btns onSave={save} onClose={closeModal} label="Save Order"/>
    </Modal>
  );
}

function EditBulkOrderModal({order,bulkOrders,saveB,members,closeModal,showToast}){
  const[title,setTitle]=useState(order.title); const[notes,setNotes]=useState(order.notes||""); const[items,setItems]=useState(order.items.map(it=>({...it})));
  const[confirmingDelete,setConfirmingDelete]=useState(false);
  const upd=(i,k,v)=>setItems(items.map((it,idx)=>idx===i?{...it,[k]:v}:it));
  const save=()=>{
    const valid=items.filter(it=>it.item&&it.total);
    if(!valid.length){showToast("Add at least one item","error");return;}
    const grandTotal=valid.reduce((s,it)=>s+Number(it.total),0);
    saveB(bulkOrders.map(o=>o.id===order.id?{...o,title,items:valid,grandTotal,perMember:Math.round(grandTotal/members.length),notes}:o));
    closeModal();showToast("Order updated ✓");
  };
  const del=()=>{
    saveB(bulkOrders.filter(o=>o.id!==order.id));
    closeModal();showToast("Deleted","warn");
  };
  return (
    <Modal title="✏️ Edit Bulk Order" onClose={closeModal}>
      <Fld label="Order Title"><input style={IS} value={title} onChange={e=>setTitle(e.target.value)}/></Fld>
      {items.map((it,i)=>(
        <div key={i} style={{border:`1.5px solid ${B.border}`,borderRadius:10,padding:10,marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <span style={{fontSize:11,fontWeight:700,color:B.textSub}}>Item {i+1}</span>
            {items.length>1&&<button onClick={()=>setItems(items.filter((_,idx)=>idx!==i))} style={{background:"transparent",border:"none",color:B.red,cursor:"pointer",fontWeight:800}}>✕</button>}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <Fld label="Item"><select style={IS} value={it.item} onChange={e=>upd(i,"item",e.target.value)}><option value="">Select…</option>{BULK_ITEMS.map(b=><option key={b}>{b}</option>)}</select></Fld>
            <Fld label="Total (₦)"><input style={IS} type="number" value={it.total} onChange={e=>upd(i,"total",e.target.value)}/></Fld>
          </div>
          <Fld label="Qty/Unit"><input style={IS} value={it.qty} onChange={e=>upd(i,"qty",e.target.value)}/></Fld>
        </div>
      ))}
      {items.length<5&&<button onClick={()=>setItems([...items,{item:"",total:"",qty:""}])} style={{width:"100%",background:B.bg,border:`1.5px dashed ${B.border}`,borderRadius:9,padding:9,cursor:"pointer",fontSize:13,fontWeight:700,color:B.navy,marginBottom:12}}>+ Add Item</button>}
      <Fld label="Notes"><textarea style={{...IS,resize:"none"}} rows={2} value={notes} onChange={e=>setNotes(e.target.value)}/></Fld>
      {!confirmingDelete?(
        <div style={{display:"flex",gap:8,marginTop:6}}>
          <button onClick={()=>setConfirmingDelete(true)} style={{flex:1,background:"transparent",border:`1.5px solid ${B.red}`,borderRadius:9,padding:11,cursor:"pointer",fontSize:13,fontWeight:700,color:B.red}}>🗑</button>
          <button onClick={closeModal} style={{flex:1,background:"transparent",border:`1.5px solid ${B.border}`,borderRadius:9,padding:11,cursor:"pointer",fontSize:13,fontWeight:700,color:B.textMid}}>Cancel</button>
          <button onClick={save} style={{flex:2,background:`linear-gradient(135deg,${B.navy},${B.blue})`,color:"#fff",border:"none",borderRadius:9,padding:11,cursor:"pointer",fontSize:13,fontWeight:800}}>Save</button>
        </div>
      ):(
        <DeleteConfirmInline label="Delete this order? This cannot be undone." onConfirm={del} onCancel={()=>setConfirmingDelete(false)}/>
      )}
    </Modal>
  );
}

function AddMemberModal({members,saveM,closeModal,showToast}){
  const[name,setName]=useState(""); const[role,setRole]=useState("Member"); const[phone,setPhone]=useState("");
  const[pw,setPw]=useState(""); const[adm,setAdm]=useState(false); const[photo,setPhoto]=useState(null);
  const save=()=>{
    if(!name.trim()||!phone||!pw){showToast("Fill all fields","error");return;}
    const newId="AYI"+String(members.length+1).padStart(4,"0");
    saveM([...members,{id:newId,name:name.toUpperCase().trim(),role,phone,joined:new Date().toLocaleDateString("en-NG",{month:"long",year:"numeric"}),password:pw,isAdmin:adm,photo,email:""}]);
    closeModal();showToast("Member added ✓");
  };
  return (
    <Modal title="👤 Add Member" onClose={closeModal}>
      <PhotoPicker photo={photo} onPhoto={setPhoto} size={70}/>
      <div style={{background:"#E8F5E9",borderRadius:9,padding:"9px 12px",marginBottom:12,fontSize:11,color:B.green}}>New members pay ₦1,000 registration fee</div>
      <Fld label="Full Name"><input style={IS} value={name} onChange={e=>setName(e.target.value)} placeholder="FULL NAME IN CAPS"/></Fld>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <Fld label="Role"><select style={IS} value={role} onChange={e=>setRole(e.target.value)}>{["Member","Deputy Chairman","Secretary","Treasurer"].map(r=><option key={r}>{r}</option>)}</select></Fld>
        <Fld label="Phone"><input style={IS} type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="080…"/></Fld>
      </div>
      <Fld label="Initial Password"><input style={IS} value={pw} onChange={e=>setPw(e.target.value)}/></Fld>
      <Fld label="Admin Access"><select style={IS} value={String(adm)} onChange={e=>setAdm(e.target.value==="true")}><option value="false">No</option><option value="true">Yes</option></select></Fld>
      <Btns onSave={save} onClose={closeModal} label="Add Member"/>
    </Modal>
  );
}

function MemberDetailModal({member,members,saveM,closeModal,showToast,isAdmin,getMT,getMC,getOut,pShare}){
  const[photo,setPhoto]=useState(member.photo); const[editPhoto,setEditPhoto]=useState(false);
  const[confirmingDelete,setConfirmingDelete]=useState(false);
  const savePhoto=()=>{saveM(members.map(m=>m.id===member.id?{...m,photo}:m));setEditPhoto(false);showToast("Photo updated ✓");};
  const removeMember=()=>{
    saveM(members.filter(x=>x.id!==member.id));
    closeModal();showToast("Removed","warn");
  };
  return (
    <Modal title="👤 Member Profile" onClose={closeModal}>
      <div style={{display:"flex",alignItems:"center",gap:12,padding:14,background:B.bg,borderRadius:10,marginBottom:14}}>
        <div style={{position:"relative"}}>
          <Av name={member.name} role={member.role} photo={photo} size={54}/>
          <button onClick={()=>setEditPhoto(!editPhoto)} style={{position:"absolute",bottom:-2,right:-2,background:B.gold,border:"2px solid #fff",borderRadius:"50%",width:20,height:20,fontSize:10,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>✏️</button>
        </div>
        <div>
          <p style={{margin:0,fontWeight:900,fontSize:14,color:B.navy}}>{member.name}</p>
          <div style={{display:"flex",gap:5,margin:"4px 0",flexWrap:"wrap"}}>
            <Badge text={member.role} color={roleColor(member.role)} bg={`${roleColor(member.role)}18`}/>
            {member.isAdmin&&<Badge text="ADMIN" color={B.gold} bg="#FDF6E3"/>}
            <Badge text={member.id} color={B.textSub} bg="#F0F1F3"/>
          </div>
          <p style={{margin:0,fontSize:11,color:B.textSub}}>{member.phone}</p>
        </div>
      </div>
      {editPhoto&&(
        <div style={{marginBottom:14,padding:14,background:"#F0F4FF",borderRadius:10,border:`1.5px dashed ${B.blue}`}}>
          <PhotoPicker photo={photo} onPhoto={setPhoto} size={60}/>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>setEditPhoto(false)} style={{flex:1,padding:9,borderRadius:9,border:`1.5px solid ${B.border}`,background:"transparent",cursor:"pointer",fontSize:12,fontWeight:700,color:B.textMid}}>Cancel</button>
            <button onClick={savePhoto} style={{flex:2,padding:9,borderRadius:9,border:"none",background:`linear-gradient(135deg,${B.navy},${B.blue})`,color:"#fff",cursor:"pointer",fontSize:12,fontWeight:800}}>Save Photo</button>
          </div>
        </div>
      )}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
        {[["Savings",`₦${fmt(getMT(member.id,"savings"))}`,B.green],["Loan",`₦${fmt(getOut(member.id))}`,B.red],["Profit",`₦${fmt(pShare(member.id))}`,B.blue]].map(([l,v,c])=>(
          <div key={l} style={{background:B.bg,borderRadius:9,padding:10,textAlign:"center",border:`1px solid ${B.border}`}}>
            <p style={{margin:0,fontSize:10,color:B.textSub,fontWeight:700}}>{l}</p>
            <p style={{margin:"4px 0 0",fontWeight:800,color:c,fontSize:13}}>{v}</p>
          </div>
        ))}
      </div>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
        <thead><tr>{["Type","Total","Times"].map(h=><th key={h} style={{textAlign:"left",padding:"7px 10px",color:B.textSub,fontWeight:700,fontSize:10,textTransform:"uppercase",borderBottom:`1.5px solid ${B.border}`,background:B.bg}}>{h}</th>)}</tr></thead>
        <tbody>{CTYPES.map(ct=>(
          <tr key={ct.key}>
            <td style={{padding:"8px 10px",borderBottom:`1px solid ${B.border}`}}>{ct.icon} {ct.label}</td>
            <td style={{padding:"8px 10px",borderBottom:`1px solid ${B.border}`}}><strong style={{color:ct.color}}>₦{fmt(getMT(member.id,ct.key))}</strong></td>
            <td style={{padding:"8px 10px",borderBottom:`1px solid ${B.border}`}}>{getMC(member.id,ct.key).length}x</td>
          </tr>
        ))}</tbody>
      </table>
      {isAdmin&&!confirmingDelete&&(
        <button onClick={()=>setConfirmingDelete(true)} style={{width:"100%",marginTop:14,background:"transparent",border:`1.5px solid ${B.red}`,borderRadius:9,padding:10,cursor:"pointer",fontSize:12,fontWeight:700,color:B.red}}>🗑 Remove Member</button>
      )}
      {isAdmin&&confirmingDelete&&(
        <div style={{marginTop:14}}>
          <DeleteConfirmInline label={`Remove ${member.name}? This cannot be undone.`} onConfirm={removeMember} onCancel={()=>setConfirmingDelete(false)}/>
        </div>
      )}
      <button onClick={closeModal} style={{width:"100%",marginTop:8,background:"transparent",border:`1.5px solid ${B.border}`,borderRadius:9,padding:10,cursor:"pointer",fontSize:13,fontWeight:700,color:B.textMid}}>Close</button>
    </Modal>
  );
}

function ChangePwModal({user,members,saveM,setUser,closeModal,showToast}){
  const[old,setOld]=useState(""); const[p1,setP1]=useState(""); const[p2,setP2]=useState("");
  const save=()=>{
    if(old!==user.password){showToast("Wrong current password","error");return;}
    if(p1.length<6){showToast("Min 6 characters","error");return;}
    if(p1!==p2){showToast("Passwords don't match","error");return;}
    saveM(members.map(m=>m.id===user.id?{...m,password:p1}:m));
    setUser({...user,password:p1});closeModal();showToast("Password changed ✓");
  };
  return (
    <Modal title="🔑 Change Password" onClose={closeModal}>
      {[["Current Password",old,setOld],["New Password",p1,setP1],["Confirm Password",p2,setP2]].map(([l,v,sv])=>(
        <Fld key={l} label={l}><input style={IS} type="password" value={v} onChange={e=>sv(e.target.value)}/></Fld>
      ))}
      <Btns onSave={save} onClose={closeModal} label="Change Password"/>
    </Modal>
  );
}

function LoanApplyModal({user,loanApplications,saveLoanApps,closeModal,showToast,getOut,loanPool,totOut}){
  const[amt,setAmt]=useState(""); const[mo,setMo]=useState(10); const[reason,setReason]=useState("");
  const available=Math.max(0,loanPool-totOut);
  const hasActive=getOut(user.id)>0;
  const hasPending=loanApplications.some(a=>a.memberId===user.id&&a.status==="pending");
  const save=()=>{
    if(hasActive){showToast("You have an active loan","error");return;}
    if(hasPending){showToast("Pending application exists","warn");return;}
    if(!amt||Number(amt)<1000){showToast("Enter valid amount","error");return;}
    if(Number(amt)>available){showToast("Exceeds available pool","error");return;}
    if(!reason.trim()){showToast("State purpose","error");return;}
    saveLoanApps([...loanApplications,{id:Date.now(),memberId:user.id,memberName:user.name,amount:Number(amt),months:Math.min(10,Number(mo)),reason,status:"pending",date:today()}]);
    closeModal();showToast("Application submitted ✓");
  };
  return (
    <Modal title="🏦 Apply for Loan" onClose={closeModal}>
      {hasActive&&<div style={{background:"#FDECEC",borderRadius:9,padding:10,marginBottom:12,fontSize:12,color:B.red,border:"1px solid #FFCDD2"}}>⚠ You have an active loan.</div>}
      {hasPending&&<div style={{background:"#FFF3E0",borderRadius:9,padding:10,marginBottom:12,fontSize:12,color:"#E65100",border:"1px solid #FFE0B2"}}>⚠ Pending application exists.</div>}
      <div style={{background:"#E8F5E9",borderRadius:9,padding:10,marginBottom:12,fontSize:12,border:"1px solid #C8E6C9"}}>Max available: <strong style={{color:B.green}}>₦{fmt(available)}</strong> · 5% admin charge</div>
      <Fld label="Amount (₦)"><input style={IS} type="number" value={amt} onChange={e=>setAmt(e.target.value)} placeholder="e.g. 50000"/></Fld>
      <Fld label="Repayment Months (max 10)"><input style={IS} type="number" min={1} max={10} value={mo} onChange={e=>setMo(Math.min(10,e.target.value))}/></Fld>
      <Fld label="Purpose / Reason"><textarea style={{...IS,resize:"none"}} rows={3} value={reason} onChange={e=>setReason(e.target.value)} placeholder="Why do you need this loan?"/></Fld>
      {Number(amt)>0&&!hasActive&&(
        <div style={{background:B.bg,borderRadius:9,padding:10,fontSize:12,marginBottom:4,border:`1px solid ${B.border}`}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,textAlign:"center"}}>
            {[["5% Charge",`₦${fmt(amt*.05)}`,"#7A5800"],["You Receive",`₦${fmt(amt-amt*.05)}`,B.green],["You Repay",`₦${fmt(amt)}`,B.navy]].map(([l,v,c])=>(
              <div key={l} style={{background:"#fff",borderRadius:7,padding:8}}>
                <p style={{margin:0,fontSize:10,color:B.textSub}}>{l}</p>
                <p style={{margin:"2px 0 0",fontWeight:800,color:c,fontSize:12}}>{v}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <Btns onSave={save} onClose={closeModal} label="Submit Application"/>
    </Modal>
  );
}

function BulkRequestModal({user,bulkRequests,saveBulkReqs,closeModal,showToast}){
  const[items,setItems]=useState([{item:"",qty:"",notes:""}]);
  const upd=(i,k,v)=>setItems(items.map((it,idx)=>idx===i?{...it,[k]:v}:it));
  const save=()=>{
    const valid=items.filter(it=>it.item&&it.qty);
    if(!valid.length){showToast("Add at least one item","error");return;}
    saveBulkReqs([...bulkRequests,{id:Date.now(),memberId:user.id,memberName:user.name,items:valid,status:"pending",date:today()}]);
    closeModal();showToast("Request submitted ✓");
  };
  return (
    <Modal title="🛒 Request Bulk Items" onClose={closeModal}>
      <div style={{background:"#E8F4FF",borderRadius:9,padding:10,marginBottom:12,fontSize:12,color:B.blue,border:"1px solid #90CAF9"}}>Select up to <strong>5 items</strong> for the next bulk purchase.</div>
      {items.map((it,i)=>(
        <div key={i} style={{border:`1.5px solid ${B.border}`,borderRadius:10,padding:10,marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <span style={{fontSize:11,fontWeight:700,color:B.textSub}}>Item {i+1}</span>
            {items.length>1&&<button onClick={()=>setItems(items.filter((_,idx)=>idx!==i))} style={{background:"transparent",border:"none",color:B.red,cursor:"pointer",fontSize:14,fontWeight:800}}>✕</button>}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <Fld label="Item"><select style={IS} value={it.item} onChange={e=>upd(i,"item",e.target.value)}><option value="">Select…</option>{BULK_ITEMS.map(b=><option key={b}>{b}</option>)}</select></Fld>
            <Fld label="Qty / Unit"><input style={IS} value={it.qty} onChange={e=>upd(i,"qty",e.target.value)} placeholder="e.g. 2 bags"/></Fld>
          </div>
          <Fld label="Notes"><input style={IS} value={it.notes} onChange={e=>upd(i,"notes",e.target.value)} placeholder="Brand or preference…"/></Fld>
        </div>
      ))}
      {items.length<5&&<button onClick={()=>setItems([...items,{item:"",qty:"",notes:""}])} style={{width:"100%",background:B.bg,border:`1.5px dashed ${B.border}`,borderRadius:9,padding:9,cursor:"pointer",fontSize:13,fontWeight:700,color:B.navy,marginBottom:12}}>+ Add Item ({items.length}/5)</button>}
      <Btns onSave={save} onClose={closeModal} label="Submit Request"/>
    </Modal>
  );
}

function ProfileModal({user,setUser,members,saveM,closeModal,showToast}){
  const[photo,setPhoto]=useState(user.photo); const[changed,setChanged]=useState(false);
  const[email,setEmail]=useState(user.email||""); const[editEmail,setEditEmail]=useState(false);
  const savePhoto=()=>{saveM(members.map(m=>m.id===user.id?{...m,photo}:m));setUser({...user,photo});setChanged(false);showToast("Photo updated ✓");};
  const saveEmail=()=>{
    if(email&&!/^\S+@\S+\.\S+$/.test(email)){showToast("Enter a valid email","error");return;}
    saveM(members.map(m=>m.id===user.id?{...m,email}:m));
    setUser({...user,email});setEditEmail(false);showToast("Email updated ✓");
  };
  return (
    <Modal title="👤 My Profile" onClose={closeModal}>
      <div style={{textAlign:"center",marginBottom:16}}>
        <PhotoPicker photo={photo} onPhoto={p=>{setPhoto(p);setChanged(true);}} size={90}/>
        {changed&&<button onClick={savePhoto} style={{background:`linear-gradient(135deg,${B.navy},${B.blue})`,color:"#fff",border:"none",borderRadius:9,padding:"8px 24px",cursor:"pointer",fontSize:13,fontWeight:800}}>Save Photo</button>}
      </div>
      <div style={{background:B.bg,borderRadius:10,padding:14,border:`1px solid ${B.border}`,marginBottom:editEmail?8:14}}>
        {[["Full Name",user.name],["Member ID",user.id],["Role",user.role],["Phone",user.phone],["Joined",user.joined]].map(([l,v])=>(
          <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${B.border}`}}>
            <span style={{fontSize:11,color:B.textSub,fontWeight:700}}>{l}</span>
            <span style={{fontSize:12,fontWeight:700,color:B.navy}}>{v}</span>
          </div>
        ))}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0"}}>
          <span style={{fontSize:11,color:B.textSub,fontWeight:700}}>Email</span>
          {!editEmail&&(
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <span style={{fontSize:12,fontWeight:700,color:user.email?B.navy:B.textSub}}>{user.email||"Not set"}</span>
              <button onClick={()=>setEditEmail(true)} style={{background:"transparent",border:"none",cursor:"pointer",fontSize:13}}>✏️</button>
            </div>
          )}
        </div>
      </div>
      {editEmail&&(
        <div style={{marginBottom:14}}>
          <Fld label="Email Address"><input style={IS} type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></Fld>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>{setEditEmail(false);setEmail(user.email||"");}} style={{flex:1,padding:9,borderRadius:9,border:`1.5px solid ${B.border}`,background:"transparent",cursor:"pointer",fontSize:12,fontWeight:700,color:B.textMid}}>Cancel</button>
            <button onClick={saveEmail} style={{flex:2,padding:9,borderRadius:9,border:"none",background:`linear-gradient(135deg,${B.navy},${B.blue})`,color:"#fff",cursor:"pointer",fontSize:12,fontWeight:800}}>Save Email</button>
          </div>
        </div>
      )}
      <button onClick={closeModal} style={{width:"100%",marginTop:4,background:"transparent",border:`1.5px solid ${B.border}`,borderRadius:9,padding:10,cursor:"pointer",fontSize:13,fontWeight:700,color:B.textMid}}>Close</button>
    </Modal>
  );
}

function ConfirmDeleteEventModal({event,events,saveE,closeModal,showToast}){
  const confirm=()=>{
    saveE(events.filter(x=>x.id!==event.id));
    closeModal();
    showToast("Event deleted","warn");
  };
  return (
    <Modal title="🗑 Delete Event" onClose={closeModal}>
      <p style={{fontSize:13,color:B.textMid,marginBottom:16}}>
        Delete "<strong>{event.name}</strong>"? This cannot be undone.
      </p>
      <div style={{display:"flex",gap:8}}>
        <button onClick={closeModal} style={{flex:1,background:"transparent",border:`1.5px solid ${B.border}`,borderRadius:9,padding:11,cursor:"pointer",fontSize:13,fontWeight:700,color:B.textMid}}>Cancel</button>
        <button onClick={confirm} style={{flex:2,background:B.red,color:"#fff",border:"none",borderRadius:9,padding:11,cursor:"pointer",fontSize:13,fontWeight:800}}>Delete</button>
      </div>
    </Modal>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
function AppInner(){
  const[members,setMembers]=useState(MEMBERS0);
  const[contribs,setContribs]=useState({});
  const[loans,setLoans]=useState([]);
  const[events,setEvents]=useState([]);
  const[bulkOrders,setBulkOrders]=useState([]);
  const[loanApplications,setLoanApplications]=useState([]);
  const[bulkRequests,setBulkRequests]=useState([]);
  const[user,setUser]=useState(null);
  const[view,setView]=useState("dashboard");
  const[modal,setModal]=useState(null);
  const[toast,setToast]=useState(null);
  const[ctab,setCtab]=useState("savings");
  const[ready,setReady]=useState(false);
  const isDesktop=useIsDesktop();

  useEffect(()=>{
    const timeout=setTimeout(()=>setReady(true),8000);
    (async()=>{
      try{const v=await sbGet("ay4-members");if(v)setMembers(v);}catch{}
      try{const v=await sbGet("ay4-contribs");if(v)setContribs(v);}catch{}
      try{const v=await sbGet("ay4-loans");if(v)setLoans(v);}catch{}
      try{const v=await sbGet("ay4-events");if(v)setEvents(v);}catch{}
      try{const v=await sbGet("ay4-bulk");if(v)setBulkOrders(v);}catch{}
      try{const v=await sbGet("ay4-loanapps");if(v)setLoanApplications(v);}catch{}
      try{const v=await sbGet("ay4-bulkreqs");if(v)setBulkRequests(v);}catch{}
      clearTimeout(timeout);setReady(true);
    })();
  },[]);

  const saveM=useCallback(async d=>{setMembers(d);try{await sbSet("ay4-members",d);}catch{}},[]);
  const saveC=useCallback(async d=>{setContribs(d);try{await sbSet("ay4-contribs",d);}catch{}},[]);
  const saveL=useCallback(async d=>{setLoans(d);try{await sbSet("ay4-loans",d);}catch{}},[]);
  const saveE=useCallback(async d=>{setEvents(d);try{await sbSet("ay4-events",d);}catch{}},[]);
  const saveB=useCallback(async d=>{setBulkOrders(d);try{await sbSet("ay4-bulk",d);}catch{}},[]);
  const saveLoanApps=useCallback(async d=>{setLoanApplications(d);try{await sbSet("ay4-loanapps",d);}catch{}},[]);
  const saveBulkReqs=useCallback(async d=>{setBulkRequests(d);try{await sbSet("ay4-bulkreqs",d);}catch{}},[]);

  const showToast=(msg,type="success")=>{setToast({msg,type});setTimeout(()=>setToast(null),3000);};
  const closeModal=()=>setModal(null);

  const getMC=(id,type)=>{const all=contribs[id]||[];return type?all.filter(c=>c.type===type):all;};
  const getMT=(id,type)=>getMC(id,type).reduce((s,c)=>s+Number(c.amount),0);
  const getOut=id=>loans.filter(l=>l.memberId===id&&l.status==="active").reduce((s,l)=>s+Number(l.balance),0);
  const totC=type=>members.reduce((s,m)=>s+getMT(m.id,type),0);
  const totOut=()=>loans.filter(l=>l.status==="active").reduce((s,l)=>s+Number(l.balance),0);
  const totP=()=>loans.reduce((s,l)=>s+Number(l.profit||0),0);
  const loanableBase=()=>totC("savings")+totC("monthly");
  const loanPool=()=>loanableBase()*.7;
  const reserve=()=>loanableBase()*.3;
  const pShare=id=>totC("savings")>0&&totP()>0?(getMT(id,"savings")/totC("savings"))*totP():0;
  const grandTotal=()=>totC("savings")+totC("monthly");

  const pendingLoans=loanApplications.filter(a=>a.status==="pending");
  const pendingBulk=bulkRequests.filter(r=>r.status==="pending");

  if(!ready) return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:B.bg,flexDirection:"column",gap:16}}>
      <Logo size={72}/><p style={{color:B.navy,fontWeight:700}}>Loading…</p>
    </div>
  );
  if(!user) return <LoginPage members={members} onLogin={m=>{setUser(m);setView("dashboard");}}/>;

  const isAdmin=user.isAdmin;

  const NAVS=[
    {k:"dashboard",l:"Home",i:"🏠"},
    {k:"contributions",l:"Savings",i:"💰"},
    {k:"social",l:"Social",i:"💍"},
    {k:"loans",l:"Loans",i:"🏦"},
    {k:"bulk",l:"Bulk",i:"🛒"},
    {k:"applications",l:"Apply",i:"📝"},
    ...(isAdmin?[{k:"members",l:"Members",i:"👥"},{k:"reports",l:"Reports",i:"📊"}]:[]),
  ];

  const approveApp=app=>{
    if(getOut(app.memberId)>0){showToast("Member has active loan","error");return;}
    const profit=Math.round(app.amount*.05);
    saveL([...loans,{id:Date.now(),memberId:app.memberId,amount:app.amount,profit,balance:app.amount,months:app.months,payments:[],status:"active",date:today()}]);
    saveLoanApps(loanApplications.map(a=>a.id===app.id?{...a,status:"approved"}:a));
    showToast("Loan approved ✓");
  };
  const rejectApp=app=>{saveLoanApps(loanApplications.map(a=>a.id===app.id?{...a,status:"rejected"}:a));showToast("Rejected","warn");};
  const approveBR=r=>{saveBulkReqs(bulkRequests.map(x=>x.id===r.id?{...x,status:"approved"}:x));showToast("Approved ✓");};
  const rejectBR=r=>{saveBulkReqs(bulkRequests.map(x=>x.id===r.id?{...x,status:"rejected"}:x));showToast("Rejected","warn");};
  const deleteEvent=ev=>{
    setModal({type:"confirmDeleteEvent",data:{event:ev}});
  };

  const renderModal=()=>{
    if(!modal)return null;
    const{type,data={}}=modal; const c={closeModal,showToast};
    if(type==="addContrib")    return <AddContribModal {...c} members={members} contribs={contribs} saveC={saveC} ctype={data.ctype||"savings"}/>;
    if(type==="editContrib")   return <EditContribModal {...c} record={data.record} members={members} contribs={contribs} saveC={saveC}/>;
    if(type==="addLoan")       return <AddLoanModal {...c} members={members} loans={loans} saveL={saveL} loanPool={loanPool()} totOut={totOut()} getOut={getOut} preselect={data.preselect||null}/>;
    if(type==="editLoan")      return <EditLoanModal {...c} loan={data.loan} members={members} loans={loans} saveL={saveL}/>;
    if(type==="loanPay")       return <LoanPayModal {...c} loan={data.loan} members={members} loans={loans} saveL={saveL}/>;
    if(type==="newEvent")      return <NewEventModal {...c} members={members} events={events} saveE={saveE}/>;
    if(type==="eventPay")      return <EventPayModal {...c} event={data.event} member={data.member} events={events} saveE={saveE}/>;
    if(type==="editEventPay")  return <EditEventPayModal {...c} event={data.event} payment={data.payment} events={events} saveE={saveE} members={members}/>;
    if(type==="confirmDeleteEvent") return <ConfirmDeleteEventModal {...c} event={data.event} events={events} saveE={saveE}/>;
    if(type==="addBulk")       return <AddBulkModal {...c} members={members} bulkOrders={bulkOrders} saveB={saveB}/>;
    if(type==="editBulkOrder") return <EditBulkOrderModal {...c} order={data.order} bulkOrders={bulkOrders} saveB={saveB} members={members}/>;
    if(type==="addMember")     return <AddMemberModal {...c} members={members} saveM={saveM}/>;
    if(type==="memberDetail")  return <MemberDetailModal {...c} member={data.member} members={members} saveM={saveM} isAdmin={isAdmin} getMT={getMT} getMC={getMC} getOut={getOut} pShare={pShare}/>;
    if(type==="changePw")      return <ChangePwModal {...c} user={user} members={members} saveM={saveM} setUser={setUser}/>;
    if(type==="loanApply")     return <LoanApplyModal {...c} user={user} loanApplications={loanApplications} saveLoanApps={saveLoanApps} getOut={getOut} loanPool={loanPool()} totOut={totOut()}/>;
    if(type==="bulkRequest")   return <BulkRequestModal {...c} user={user} bulkRequests={bulkRequests} saveBulkReqs={saveBulkReqs}/>;
    if(type==="profile")       return <ProfileModal {...c} user={user} setUser={setUser} members={members} saveM={saveM}/>;
    return null;
  };

  // ── Page renderers ────────────────────────────────────────────────────────
  const PageDashboard=()=>(
    <>
      <div style={{background:`linear-gradient(135deg,${B.navyDk},${B.blue})`,borderRadius:16,padding:16,marginBottom:12}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{cursor:"pointer"}} onClick={()=>setModal({type:"profile"})}>
            <Av name={user.name} role={user.role} photo={user.photo} size={52}/>
          </div>
          <div>
            <p style={{margin:0,fontSize:17,fontWeight:900,color:"#fff"}}>Welcome, {user.name.split(" ")[0]}!</p>
            <p style={{margin:"2px 0",fontSize:10.5,color:"#E0B84A"}}>{user.role} · {user.id}</p>
            <p style={{margin:"6px 0 0",fontSize:12,color:"rgba(255,255,255,.8)"}}>
              Savings: <strong style={{color:"#fff"}}>₦{fmt(getMT(user.id,"savings"))}</strong>
              &nbsp;·&nbsp;Loan: <strong style={{color:getOut(user.id)>0?"#FF8A80":"rgba(255,255,255,.6)"}}>₦{fmt(getOut(user.id))}</strong>
            </p>
          </div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
        {[["🏦","Apply for Loan","Request funds","loanApply"],["🛒","Bulk Request","Request items","bulkRequest"]].map(([i,t,s,m])=>(
          <button key={m} onClick={()=>setModal({type:m})} style={{background:"#fff",border:`1.5px solid ${B.border}`,borderRadius:12,padding:12,cursor:"pointer",textAlign:"left"}}>
            <div style={{fontSize:22,marginBottom:4}}>{i}</div>
            <p style={{margin:0,fontWeight:800,fontSize:12,color:B.navy}}>{t}</p>
            <p style={{margin:"2px 0 0",fontSize:10,color:B.textSub}}>{s}</p>
          </button>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
        <StatCard icon="👥" label="Members" value={members.length} color={B.navy}/>
        <StatCard icon="💰" label="Total Savings" value={`₦${fmt(totC("savings"))}`} color={B.green}/>
        <StatCard icon="🏦" label="Loan Pool 70%" value={`₦${fmt(loanPool())}`} color={B.blue}/>
        <StatCard icon="🔒" label="Reserve 30%" value={`₦${fmt(reserve())}`} color={B.gold}/>
        <StatCard icon="📋" label="Outstanding" value={`₦${fmt(totOut())}`} color={B.red}/>
        <StatCard icon="💹" label="Profit" value={`₦${fmt(totP())}`} color={B.green}/>
      </div>
      <Card>
        <SecHead title="Contribution Breakdown"/>
        {CTYPES.map(ct=>(
          <div key={ct.key} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 14px",borderBottom:`1px solid ${B.border}`}}>
            <span style={{fontSize:12,color:B.textMid}}>{ct.icon} {ct.label}</span>
            <strong style={{color:ct.color,fontSize:13}}>₦{fmt(totC(ct.key))}</strong>
          </div>
        ))}
        <div style={{display:"flex",justifyContent:"space-between",padding:"10px 14px"}}>
          <span style={{fontWeight:800,color:B.navy,fontSize:13}}>GRAND TOTAL</span>
          <strong style={{color:B.navy,fontSize:15}}>₦{fmt(grandTotal())}</strong>
        </div>
      </Card>
    </>
  );

  const PageContributions=()=>{
    const ct=CTYPES.find(t=>t.key===ctab)||CTYPES[0];
    const allRows=isAdmin
      ?Object.entries(contribs).flatMap(([mid,cs])=>cs.filter(c=>c.type===ctab).map(c=>({...c,mid,contributorName:members.find(m=>m.id===mid)?.name||mid}))).sort((a,b)=>b.id-a.id)
      :getMC(user.id,ctab).sort((a,b)=>b.id-a.id);
    return (
      <>
        <div style={{display:"flex",gap:6,overflowX:"auto",marginBottom:12,paddingBottom:2}}>
          {CTYPES.map(t=>(
            <button key={t.key} onClick={()=>setCtab(t.key)} style={{flexShrink:0,padding:"7px 13px",borderRadius:20,border:`1.5px solid ${ctab===t.key?B.navy:B.border}`,background:ctab===t.key?B.navy:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",color:ctab===t.key?"#fff":B.textSub,whiteSpace:"nowrap"}}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
        <Card>
          <SecHead title={`${ct.icon} ${ct.label}`} right={
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <strong style={{color:ct.color}}>₦{fmt(totC(ctab))}</strong>
              {isAdmin&&<PBtn small onClick={()=>setModal({type:"addContrib",data:{ctype:ctab}})}>+ Record</PBtn>}
            </div>
          }/>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
              <thead><tr>
                {isAdmin&&<th style={{textAlign:"left",padding:"8px 10px",color:B.textSub,fontWeight:700,fontSize:10,textTransform:"uppercase",borderBottom:`1.5px solid ${B.border}`,background:B.bg}}>Member</th>}
                {["Period","Amount","Date",isAdmin?"Edit":""].filter(Boolean).map(h=>(
                  <th key={h} style={{textAlign:"left",padding:"8px 10px",color:B.textSub,fontWeight:700,fontSize:10,textTransform:"uppercase",borderBottom:`1.5px solid ${B.border}`,background:B.bg,whiteSpace:"nowrap"}}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {allRows.length===0&&<tr><td colSpan={5} style={{textAlign:"center",padding:24,color:B.textSub}}>No records yet.</td></tr>}
                {allRows.map(c=>(
                  <tr key={c.id} onClick={()=>isAdmin&&setModal({type:"editContrib",data:{record:c}})} style={{cursor:isAdmin?"pointer":"default"}}>
                    {isAdmin&&<td style={{padding:"9px 10px",borderBottom:`1px solid ${B.border}`,fontSize:11,fontWeight:600}}>{(c.contributorName||"").split(" ")[0]}</td>}
                    <td style={{padding:"9px 10px",borderBottom:`1px solid ${B.border}`,whiteSpace:"nowrap"}}>{c.month} {c.year}</td>
                    <td style={{padding:"9px 10px",borderBottom:`1px solid ${B.border}`}}><strong style={{color:ct.color}}>₦{fmt(c.amount)}</strong></td>
                    <td style={{padding:"9px 10px",borderBottom:`1px solid ${B.border}`,fontSize:11}}>{c.date}</td>
                    {isAdmin&&<td style={{padding:"9px 10px",borderBottom:`1px solid ${B.border}`}}>✏️</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        {isAdmin&&(
          <Card>
            <SecHead title="Member Summary"/>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
                <thead><tr>{["Member","Total","Times"].map(h=><th key={h} style={{textAlign:"left",padding:"8px 10px",color:B.textSub,fontWeight:700,fontSize:10,textTransform:"uppercase",borderBottom:`1.5px solid ${B.border}`,background:B.bg}}>{h}</th>)}</tr></thead>
                <tbody>{members.map(m=>(
                  <tr key={m.id}>
                    <td style={{padding:"9px 10px",borderBottom:`1px solid ${B.border}`,fontSize:11,fontWeight:700}}>{m.name.split(" ").slice(0,2).join(" ")}</td>
                    <td style={{padding:"9px 10px",borderBottom:`1px solid ${B.border}`}}><strong style={{color:ct.color}}>₦{fmt(getMT(m.id,ctab))}</strong></td>
                    <td style={{padding:"9px 10px",borderBottom:`1px solid ${B.border}`}}>{getMC(m.id,ctab).length}x</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </Card>
        )}
      </>
    );
  };

  const PageSocialAdmin=()=>(
    <>
      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:12}}>
        <PBtn small onClick={()=>setModal({type:"newEvent"})}>+ New Event</PBtn>
      </div>
      {events.length===0&&<Card><div style={{padding:30,textAlign:"center",color:B.textSub}}>No social events yet.</div></Card>}
      {[...events].reverse().map(ev=>{
        const collected=ev.payments.reduce((s,p)=>s+Number(p.amount),0);
        const recipient=members.find(m=>m.id===ev.recipientId);
        return (
          <Card key={ev.id} mb={12}>
            <div style={{padding:"12px 14px",background:B.bg,borderBottom:`1.5px solid ${B.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <p style={{margin:0,fontWeight:800,fontSize:13,color:B.navy}}>
                  {ev.name} <Badge text={ev.etype==="marriage"?"💍 Marriage":"👶 Naming"} color={ev.etype==="marriage"?B.gold:"#7B1FA2"} bg={ev.etype==="marriage"?"#FDF6E3":"#F3E5F5"}/>
                </p>
                <p style={{margin:"3px 0 0",fontSize:10,color:B.textSub}}>Recipient: <strong>{recipient?.name.split(" ")[0]||"Unknown"}</strong> · {ev.date}</p>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{textAlign:"right"}}>
                  <p style={{margin:0,fontWeight:800,color:B.green,fontSize:13}}>₦{fmt(collected)}</p>
                  <p style={{margin:0,fontSize:10,color:B.textSub}}>{ev.payments.length}/{members.length} paid</p>
                </div>
                <button onClick={()=>deleteEvent(ev)} style={{background:"transparent",border:`1px solid ${B.red}66`,borderRadius:6,padding:"5px 8px",cursor:"pointer",fontSize:13,color:B.red}}>🗑</button>
              </div>
            </div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
                <thead><tr>{["Contributor","Amount","Date","Action"].map(h=>(
                  <th key={h} style={{textAlign:"left",padding:"7px 10px",color:B.textSub,fontWeight:700,fontSize:10,textTransform:"uppercase",borderBottom:`1.5px solid ${B.border}`,background:B.bg}}>{h}</th>
                ))}</tr></thead>
                <tbody>{members.map(m=>{
                  const paid=ev.payments.find(p=>p.memberId===m.id);
                  return (
                    <tr key={m.id} onClick={()=>paid&&setModal({type:"editEventPay",data:{event:ev,payment:paid}})} style={{cursor:paid?"pointer":"default"}}>
                      <td style={{padding:"8px 10px",borderBottom:`1px solid ${B.border}`,fontSize:11,fontWeight:600}}>{m.name.split(" ")[0]}</td>
                      <td style={{padding:"8px 10px",borderBottom:`1px solid ${B.border}`}}>{paid?<Badge text={`₦${fmt(paid.amount)} ✏️`} color={B.green} bg="#E8F5E9"/>:<Badge text="Pending" color="#E65100" bg="#FFF3E0"/>}</td>
                      <td style={{padding:"8px 10px",borderBottom:`1px solid ${B.border}`,fontSize:10}}>{paid?paid.date:"-"}</td>
                      <td style={{padding:"8px 10px",borderBottom:`1px solid ${B.border}`}}>
                        {!paid&&<button onClick={e=>{e.stopPropagation();setModal({type:"eventPay",data:{event:ev,member:m}});}} style={{background:"transparent",border:`1px solid ${B.green}66`,borderRadius:6,padding:"3px 8px",cursor:"pointer",fontSize:11,color:B.green,fontWeight:700}}>Pay</button>}
                      </td>
                    </tr>
                  );
                })}</tbody>
              </table>
            </div>
          </Card>
        );
      })}
    </>
  );

  const PageSocialMember=()=>{
    const myRecipient=events.filter(e=>e.recipientId===user.id);
    const myContrib=events.filter(e=>e.payments.some(p=>p.memberId===user.id)&&e.recipientId!==user.id);
    return (
      <>
        {myRecipient.length>0&&(
          <>
            <div style={{background:`linear-gradient(135deg,${B.gold},#E6A820)`,borderRadius:12,padding:"12px 16px",marginBottom:12}}>
              <p style={{margin:0,fontWeight:800,fontSize:13,color:"#fff"}}>🎉 Gifts Received by You</p>
              <p style={{margin:"2px 0 0",fontSize:11,color:"rgba(255,255,255,.85)"}}>Who contributed to your events</p>
            </div>
            {myRecipient.map(ev=>{
              const collected=ev.payments.reduce((s,p)=>s+Number(p.amount),0);
              return (
                <Card key={ev.id} mb={12}>
                  <div style={{padding:"12px 14px",background:B.bg,borderBottom:`1.5px solid ${B.border}`,display:"flex",justifyContent:"space-between"}}>
                    <div><p style={{margin:0,fontWeight:800,fontSize:13,color:B.navy}}>{ev.name}</p><p style={{margin:"2px 0 0",fontSize:10,color:B.textSub}}>{ev.date}</p></div>
                    <div style={{textAlign:"right"}}><p style={{margin:0,fontWeight:800,color:B.green,fontSize:13}}>₦{fmt(collected)}</p><p style={{margin:0,fontSize:10,color:B.textSub}}>{ev.payments.length}/{members.length} paid</p></div>
                  </div>
                  <div style={{overflowX:"auto"}}>
                    <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
                      <thead><tr>{["Contributor","Amount","Date"].map(h=><th key={h} style={{textAlign:"left",padding:"7px 10px",color:B.textSub,fontWeight:700,fontSize:10,textTransform:"uppercase",borderBottom:`1.5px solid ${B.border}`,background:B.bg}}>{h}</th>)}</tr></thead>
                      <tbody>{members.map(m=>{
                        const paid=ev.payments.find(p=>p.memberId===m.id);
                        return (
                          <tr key={m.id}>
                            <td style={{padding:"8px 10px",borderBottom:`1px solid ${B.border}`,fontSize:11,fontWeight:600}}>{m.name.split(" ")[0]}</td>
                            <td style={{padding:"8px 10px",borderBottom:`1px solid ${B.border}`}}>{paid?<Badge text={`₦${fmt(paid.amount)}`} color={B.green} bg="#E8F5E9"/>:<Badge text="Pending" color="#E65100" bg="#FFF3E0"/>}</td>
                            <td style={{padding:"8px 10px",borderBottom:`1px solid ${B.border}`,fontSize:10}}>{paid?paid.date:"-"}</td>
                          </tr>
                        );
                      })}</tbody>
                    </table>
                  </div>
                </Card>
              );
            })}
          </>
        )}
        {myContrib.length>0&&(
          <>
            <div style={{background:`linear-gradient(135deg,${B.blue},${B.navy})`,borderRadius:12,padding:"12px 16px",marginBottom:12}}>
              <p style={{margin:0,fontWeight:800,fontSize:13,color:"#fff"}}>💝 Your Contributions to Others</p>
              <p style={{margin:"2px 0 0",fontSize:11,color:"rgba(255,255,255,.85)"}}>Events you have contributed to</p>
            </div>
            {myContrib.map(ev=>{
              const myPayment=ev.payments.find(p=>p.memberId===user.id);
              const recipient=members.find(m=>m.id===ev.recipientId);
              return (
                <Card key={ev.id} mb={12}>
                  <div style={{padding:"12px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div><p style={{margin:0,fontWeight:800,fontSize:13,color:B.navy}}>{ev.name}</p><p style={{margin:"3px 0 0",fontSize:10,color:B.textSub}}>Recipient: <strong>{recipient?.name.split(" ")[0]||"Member"}</strong> · {ev.date}</p></div>
                    <div style={{textAlign:"right"}}><Badge text={`You paid ₦${fmt(myPayment?.amount||0)}`} color={B.green} bg="#E8F5E9"/><p style={{margin:"4px 0 0",fontSize:10,color:B.textSub}}>{myPayment?.date||""}</p></div>
                  </div>
                </Card>
              );
            })}
          </>
        )}
        {myRecipient.length===0&&myContrib.length===0&&(
          <Card>
            <div style={{padding:40,textAlign:"center",color:B.textSub}}>
              <div style={{fontSize:48}}>💍</div>
              <p style={{fontWeight:700,margin:"10px 0 4px",color:B.navy}}>No Social Events Yet</p>
              <p style={{fontSize:12}}>Events will appear here when you receive gifts or contribute to others.</p>
            </div>
          </Card>
        )}
      </>
    );
  };

  const PageLoans=()=>{
    const visLoans=isAdmin?loans:loans.filter(l=>l.memberId===user.id);
    return (
      <>
        {isAdmin&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
            <StatCard icon="🏦" label="Loan Pool" value={`₦${fmt(loanPool())}`} color={B.green}/>
            <StatCard icon="📤" label="Outstanding" value={`₦${fmt(totOut())}`} color={B.red}/>
            <StatCard icon="✅" label="Available" value={`₦${fmt(Math.max(0,loanPool()-totOut()))}`} color={B.blue}/>
            <StatCard icon="💹" label="Profit" value={`₦${fmt(totP())}`} color={B.gold}/>
          </div>
        )}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <span style={{fontSize:12,color:B.textSub,fontWeight:600}}>{visLoans.length} loan(s)</span>
          <div style={{display:"flex",gap:8}}>
            <PBtn small onClick={()=>setModal({type:"loanApply"})}>📝 Apply</PBtn>
            {isAdmin&&<PBtn small onClick={()=>setModal({type:"addLoan"})}>+ Issue</PBtn>}
          </div>
        </div>
        <Card>
          <SecHead title="Loan Records"/>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
              <thead><tr>
                {["Member","Amount","Balance","Status",isAdmin?"Pay":""].filter(Boolean).map(h=>(
                  <th key={h} style={{textAlign:"left",padding:"8px 10px",color:B.textSub,fontWeight:700,fontSize:10,textTransform:"uppercase",borderBottom:`1.5px solid ${B.border}`,background:B.bg,whiteSpace:"nowrap"}}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {visLoans.length===0&&<tr><td colSpan={5} style={{textAlign:"center",padding:24,color:B.textSub}}>No loans yet.</td></tr>}
                {[...visLoans].reverse().map(l=>{
                  const mn=members.find(m=>m.id===l.memberId)?.name.split(" ")[0]||l.memberId;
                  return (
                    <tr key={l.id} onClick={()=>isAdmin&&setModal({type:"editLoan",data:{loan:l}})} style={{cursor:isAdmin?"pointer":"default"}}>
                      <td style={{padding:"9px 10px",borderBottom:`1px solid ${B.border}`,fontSize:11,fontWeight:600}}>{mn}</td>
                      <td style={{padding:"9px 10px",borderBottom:`1px solid ${B.border}`}}>₦{fmt(l.amount)}</td>
                      <td style={{padding:"9px 10px",borderBottom:`1px solid ${B.border}`}}><strong style={{color:B.red}}>₦{fmt(l.balance)}</strong></td>
                      <td style={{padding:"9px 10px",borderBottom:`1px solid ${B.border}`}}><Badge text={l.status} color={l.status==="repaid"?"#00695C":"#E65100"} bg={l.status==="repaid"?"#E0F4F1":"#FFF3E0"}/></td>
                      {isAdmin&&<td style={{padding:"9px 10px",borderBottom:`1px solid ${B.border}`}}>
                        {l.status==="active"&&<button onClick={e=>{e.stopPropagation();setModal({type:"loanPay",data:{loan:l}});}} style={{background:"transparent",border:`1px solid ${B.green}66`,borderRadius:6,padding:"3px 8px",cursor:"pointer",fontSize:11,color:B.green,fontWeight:700}}>💳</button>}
                      </td>}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </>
    );
  };

  const PageBulk=()=>(
    <>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <span style={{fontSize:12,color:B.textSub,fontWeight:600}}>{bulkOrders.length} order(s)</span>
        <div style={{display:"flex",gap:8}}>
          <PBtn small onClick={()=>setModal({type:"bulkRequest"})}>📝 Request</PBtn>
          {isAdmin&&<PBtn small onClick={()=>setModal({type:"addBulk"})}>+ New Order</PBtn>}
        </div>
      </div>
      <Card>
        <SecHead title="🛒 Bulk Purchase Orders"/>
        {bulkOrders.length===0&&<div style={{padding:30,textAlign:"center",color:B.textSub}}>No bulk orders yet.</div>}
        {[...bulkOrders].reverse().map(o=>(
          <div key={o.id} onClick={()=>isAdmin&&setModal({type:"editBulkOrder",data:{order:o}})} style={{padding:"12px 14px",borderBottom:`1px solid ${B.border}`,cursor:isAdmin?"pointer":"default"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
              <strong style={{fontSize:13,color:B.navy}}>{o.title}{isAdmin&&" ✏️"}</strong>
              <span style={{fontSize:10,color:B.textSub}}>{o.date}</span>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:8}}>
              {o.items.map((it,i)=><Badge key={i} text={`${it.item}${it.qty?" ("+it.qty+")":""}`} color={B.green} bg="#E8F5E9"/>)}
            </div>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <span style={{fontSize:11,color:B.textSub}}>Per member: <strong style={{color:B.navy}}>₦{fmt(o.perMember)}</strong></span>
              <strong style={{color:B.green}}>₦{fmt(o.grandTotal)}</strong>
            </div>
          </div>
        ))}
      </Card>
    </>
  );

  const PageApplications=()=>{
    const myLoanApps=loanApplications.filter(a=>a.memberId===user.id);
    const myBulkReqs=bulkRequests.filter(r=>r.memberId===user.id);
    return (
      <>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
          {[["🏦","Apply for Loan","loanApply",B.navy],["🛒","Request Bulk Items","bulkRequest",B.green]].map(([i,t,m,col])=>(
            <button key={m} onClick={()=>setModal({type:m})} style={{background:`linear-gradient(135deg,${col},${B.blue})`,color:"#fff",border:"none",borderRadius:12,padding:14,cursor:"pointer",textAlign:"left"}}>
              <div style={{fontSize:24,marginBottom:4}}>{i}</div>
              <p style={{margin:0,fontWeight:800,fontSize:13}}>{t}</p>
            </button>
          ))}
        </div>
        <Card mb={14}>
          <SecHead title="My Loan Applications"/>
          {myLoanApps.length===0&&<div style={{padding:20,textAlign:"center",color:B.textSub,fontSize:12}}>No applications yet.</div>}
          {[...myLoanApps].reverse().map(a=>{
            const ss=sSt(a.status);
            return (
              <div key={a.id} style={{padding:"11px 14px",borderBottom:`1px solid ${B.border}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <strong style={{color:B.navy,fontSize:13}}>₦{fmt(a.amount)}</strong>
                  <Badge text={a.status.toUpperCase()} color={ss.c} bg={ss.bg}/>
                </div>
                <p style={{margin:"4px 0 0",fontSize:11,color:B.textSub}}>{a.reason}</p>
                <p style={{margin:"2px 0 0",fontSize:10,color:B.textSub}}>{a.months} months · {a.date}</p>
              </div>
            );
          })}
        </Card>
        <Card mb={14}>
          <SecHead title="My Bulk Requests"/>
          {myBulkReqs.length===0&&<div style={{padding:20,textAlign:"center",color:B.textSub,fontSize:12}}>No requests yet.</div>}
          {[...myBulkReqs].reverse().map(r=>{
            const ss=sSt(r.status);
            return (
              <div key={r.id} style={{padding:"11px 14px",borderBottom:`1px solid ${B.border}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                  <strong style={{color:B.navy,fontSize:13}}>{r.items?.length||0} item(s)</strong>
                  <Badge text={r.status.toUpperCase()} color={ss.c} bg={ss.bg}/>
                </div>
                <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                  {(r.items||[]).map((it,i)=><Badge key={i} text={`${it.item} (${it.qty})`} color={B.green} bg="#E8F5E9"/>)}
                </div>
                <p style={{margin:"4px 0 0",fontSize:10,color:B.textSub}}>{r.date}</p>
              </div>
            );
          })}
        </Card>
        {isAdmin&&(
          <>
            <Card mb={14}>
              <SecHead title={`🏦 Loan Applications (${pendingLoans.length} pending)`}/>
              {loanApplications.length===0&&<div style={{padding:20,textAlign:"center",color:B.textSub,fontSize:12}}>None yet.</div>}
              {[...loanApplications].reverse().map(a=>(
                <div key={a.id} style={{padding:"12px 14px",borderBottom:`1px solid ${B.border}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div>
                      <p style={{margin:0,fontWeight:800,fontSize:13,color:B.navy}}>{a.memberName.split(" ")[0]} — <span style={{color:B.blue}}>₦{fmt(a.amount)}</span></p>
                      <p style={{margin:"3px 0 0",fontSize:11,color:B.textSub}}>{a.reason}</p>
                      <p style={{margin:"2px 0 0",fontSize:10,color:B.textSub}}>{a.months} months · {a.date}</p>
                    </div>
                    <Badge text={a.status.toUpperCase()} color={sSt(a.status).c} bg={sSt(a.status).bg}/>
                  </div>
                  {a.status==="pending"&&(
                    <div style={{display:"flex",gap:8,marginTop:9}}>
                      <button onClick={()=>approveApp(a)} style={{flex:1,background:B.green,color:"#fff",border:"none",borderRadius:8,padding:"7px",cursor:"pointer",fontSize:12,fontWeight:800}}>✓ Approve</button>
                      <button onClick={()=>rejectApp(a)} style={{flex:1,background:B.red,color:"#fff",border:"none",borderRadius:8,padding:"7px",cursor:"pointer",fontSize:12,fontWeight:800}}>✗ Reject</button>
                      <button onClick={()=>setModal({type:"addLoan",data:{preselect:a.memberId}})} style={{flex:1,background:B.gold,color:"#fff",border:"none",borderRadius:8,padding:"7px",cursor:"pointer",fontSize:11,fontWeight:800}}>✏ Custom</button>
                    </div>
                  )}
                </div>
              ))}
            </Card>
            <Card>
              <SecHead title={`🛒 Bulk Requests (${pendingBulk.length} pending)`}/>
              {bulkRequests.length===0&&<div style={{padding:20,textAlign:"center",color:B.textSub,fontSize:12}}>None yet.</div>}
              {[...bulkRequests].reverse().map(r=>(
                <div key={r.id} style={{padding:"12px 14px",borderBottom:`1px solid ${B.border}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div style={{flex:1,minWidth:0}}>
                      <p style={{margin:0,fontWeight:800,fontSize:13,color:B.navy}}>{r.memberName.split(" ")[0]}</p>
                      <div style={{display:"flex",flexWrap:"wrap",gap:4,margin:"5px 0"}}>
                        {(r.items||[]).map((it,i)=><Badge key={i} text={`${it.item} (${it.qty})`} color={B.green} bg="#E8F5E9"/>)}
                      </div>
                      <p style={{margin:0,fontSize:10,color:B.textSub}}>{r.date}</p>
                    </div>
                    <Badge text={r.status.toUpperCase()} color={sSt(r.status).c} bg={sSt(r.status).bg}/>
                  </div>
                  {r.status==="pending"&&(
                    <div style={{display:"flex",gap:8,marginTop:9}}>
                      <button onClick={()=>approveBR(r)} style={{flex:1,background:B.green,color:"#fff",border:"none",borderRadius:8,padding:"7px",cursor:"pointer",fontSize:12,fontWeight:800}}>✓ Approve</button>
                      <button onClick={()=>rejectBR(r)} style={{flex:1,background:B.red,color:"#fff",border:"none",borderRadius:8,padding:"7px",cursor:"pointer",fontSize:12,fontWeight:800}}>✗ Reject</button>
                    </div>
                  )}
                </div>
              ))}
            </Card>
          </>
        )}
      </>
    );
  };

  const PageMembers=()=>{
    if(!isAdmin) return <Card><div style={{padding:40,textAlign:"center"}}><div style={{fontSize:48}}>🔒</div><p style={{fontWeight:800,color:B.navy}}>Admins Only</p></div></Card>;
    return (
      <>
        <div style={{display:"flex",justifyContent:"flex-end",marginBottom:12}}>
          <PBtn small onClick={()=>setModal({type:"addMember"})}>+ Add Member</PBtn>
        </div>
        {members.map(m=>(
          <div key={m.id} onClick={()=>setModal({type:"memberDetail",data:{member:m}})} style={{background:"#fff",borderRadius:13,padding:13,border:`1.5px solid ${B.border}`,marginBottom:8,cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
            <Av name={m.name} role={m.role} photo={m.photo} size={42}/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:5,flexWrap:"wrap"}}>
                <span style={{fontWeight:800,fontSize:12.5,color:B.navy}}>{m.name}</span>
                {m.isAdmin&&<Badge text="ADMIN" color={B.gold} bg="#FDF6E3"/>}
              </div>
              <p style={{margin:"2px 0 0",fontSize:10.5,color:B.textSub}}>{m.role} · {m.id}</p>
            </div>
            <div style={{textAlign:"right",flexShrink:0}}>
              <p style={{margin:0,fontWeight:800,color:B.green,fontSize:12}}>₦{fmt(getMT(m.id,"savings"))}</p>
              {getOut(m.id)>0&&<p style={{margin:"1px 0 0",fontSize:10,color:B.red,fontWeight:700}}>Loan ₦{fmt(getOut(m.id))}</p>}
            </div>
          </div>
        ))}
      </>
    );
  };

  const PageReports=()=>{
    if(!isAdmin) return <Card><div style={{padding:40,textAlign:"center"}}><div style={{fontSize:48}}>🔒</div><p style={{fontWeight:800,color:B.navy}}>Admins Only</p></div></Card>;
    const marriageTotal=events.filter(e=>e.etype==="marriage").reduce((s,e)=>s+e.payments.reduce((a,p)=>a+Number(p.amount),0),0);
    const namingTotal=events.filter(e=>e.etype==="naming").reduce((s,e)=>s+e.payments.reduce((a,p)=>a+Number(p.amount),0),0);
    return (
      <>
        <div style={{background:`linear-gradient(135deg,${B.navyDk},${B.blue})`,borderRadius:14,padding:16,marginBottom:12}}>
          <p style={{fontWeight:900,color:"#fff",fontSize:14,letterSpacing:1,margin:0}}>AYIWOZA COMMITTEE OF FRIENDS</p>
          <p style={{fontSize:10,color:"#E0B84A",margin:"3px 0 0"}}>FINANCIAL REPORT · {new Date().getFullYear()}</p>
        </div>
        <Card mb={12}>
          <SecHead title="Financial Contributions"/>
          {CTYPES.map(ct=>(
            <div key={ct.key} style={{display:"flex",justifyContent:"space-between",padding:"10px 14px",borderBottom:`1px solid ${B.border}`}}>
              <span style={{fontSize:12,color:B.textMid}}>{ct.icon} {ct.label}</span>
              <strong style={{color:ct.color,fontSize:13}}>₦{fmt(totC(ct.key))}</strong>
            </div>
          ))}
          <div style={{display:"flex",justifyContent:"space-between",padding:"11px 14px",background:B.bg}}>
            <strong style={{color:B.navy}}>Grand Total</strong>
            <strong style={{color:B.navy,fontSize:15}}>₦{fmt(grandTotal())}</strong>
          </div>
        </Card>
        <Card mb={12}>
          <SecHead title="Social Gifts (Social Module)"/>
          {[["💍 Marriage Gifts",marriageTotal,B.gold],["👶 Naming Gifts",namingTotal,"#7B1FA2"]].map(([l,v,c])=>(
            <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"10px 14px",borderBottom:`1px solid ${B.border}`}}>
              <span style={{fontSize:12,color:B.textMid}}>{l}</span>
              <strong style={{color:c,fontSize:13}}>₦{fmt(v)}</strong>
            </div>
          ))}
          <div style={{padding:"8px 14px",fontSize:11,color:B.textSub,fontStyle:"italic"}}>Excluded from Grand Total — gifts go directly to recipients.</div>
        </Card>
        <Card mb={12}>
          <SecHead title="Fund Position"/>
          {[
            ["💰 Savings",`₦${fmt(totC("savings"))}`,B.green],
            ["📅 Monthly Dues",`₦${fmt(totC("monthly"))}`,B.blue],
            ["🏦 Loan Pool (70% of Savings+Dues)",`₦${fmt(loanPool())}`,B.blue],
            ["🔒 Reserve (30% of Savings+Dues)",`₦${fmt(reserve())}`,B.gold],
            ["📋 Outstanding Loans",`₦${fmt(totOut())}`,B.red],
            ["✅ Available to Lend",`₦${fmt(Math.max(0,loanPool()-totOut()))}`,B.navy],
            ["💹 Total Profit (5%)",`₦${fmt(totP())}`,B.green],
          ].map(([l,v,c])=>(
            <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"10px 14px",borderBottom:`1px solid ${B.border}`}}>
              <span style={{fontSize:12,color:B.textMid}}>{l}</span>
              <strong style={{color:c,fontSize:13}}>{v}</strong>
            </div>
          ))}
        </Card>
        <Card>
          <SecHead title="Profit Sharing (Eid-el-Adha)"/>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
              <thead><tr>{["Member","Savings","Share%","Profit"].map(h=><th key={h} style={{textAlign:"left",padding:"8px 10px",color:B.textSub,fontWeight:700,fontSize:10,textTransform:"uppercase",borderBottom:`1.5px solid ${B.border}`,background:B.bg}}>{h}</th>)}</tr></thead>
              <tbody>
                {members.filter(m=>getMT(m.id,"savings")>0).map(m=>{
                  const pct=totC("savings")>0?(getMT(m.id,"savings")/totC("savings")*100).toFixed(1):"0.0";
                  return (
                    <tr key={m.id}>
                      <td style={{padding:"9px 10px",borderBottom:`1px solid ${B.border}`,fontSize:11,fontWeight:700}}>{m.name.split(" ")[0]}</td>
                      <td style={{padding:"9px 10px",borderBottom:`1px solid ${B.border}`}}><strong style={{color:B.green}}>₦{fmt(getMT(m.id,"savings"))}</strong></td>
                      <td style={{padding:"9px 10px",borderBottom:`1px solid ${B.border}`}}><Badge text={pct+"%"} color={B.navy} bg="#E8EBF5"/></td>
                      <td style={{padding:"9px 10px",borderBottom:`1px solid ${B.border}`}}><strong style={{color:B.blue}}>₦{fmt(pShare(m.id))}</strong></td>
                    </tr>
                  );
                })}
                {totC("savings")===0&&<tr><td colSpan={4} style={{textAlign:"center",padding:20,color:B.textSub}}>No savings yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </Card>
      </>
    );
  };

  const renderPage=()=>{
    if(view==="dashboard")    return <PageDashboard/>;
    if(view==="contributions") return <PageContributions/>;
    if(view==="social")       return isAdmin?<PageSocialAdmin/>:<PageSocialMember/>;
    if(view==="loans")        return <PageLoans/>;
    if(view==="bulk")         return <PageBulk/>;
    if(view==="applications") return <PageApplications/>;
    if(view==="members")      return <PageMembers/>;
    if(view==="reports")      return <PageReports/>;
    return null;
  };

  const Topbar=()=>(
    <div style={{background:`linear-gradient(135deg,${B.navyDk},${B.blue})`,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 16px"}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <Logo size={34}/>
        <div><p style={{fontSize:13,fontWeight:900,color:"#fff",letterSpacing:1,margin:0}}>AYIWOZA</p><p style={{fontSize:8,color:"#E0B84A",margin:0}}>COMMITTEE OF FRIENDS</p></div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:7}}>
        <button onClick={()=>setModal({type:"changePw"})} style={{background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.2)",borderRadius:8,width:32,height:32,cursor:"pointer",fontSize:14,color:"#fff"}}>🔑</button>
        <div onClick={()=>setModal({type:"profile"})} style={{display:"flex",alignItems:"center",gap:7,background:"rgba(255,255,255,.12)",borderRadius:8,padding:"5px 9px",cursor:"pointer",border:"1px solid rgba(255,255,255,.2)"}}>
          <Av name={user.name} role={user.role} photo={user.photo} size={26}/>
          <div><p style={{fontSize:11,color:"#fff",fontWeight:700,margin:0}}>{user.name.split(" ")[0]}</p><p style={{fontSize:8.5,color:"#E0B84A",margin:0}}>{user.role}</p></div>
        </div>
        <button onClick={()=>setUser(null)} style={{background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.2)",borderRadius:8,width:32,height:32,cursor:"pointer",fontSize:14,color:"#fff"}}>↩</button>
      </div>
    </div>
  );

  if(isDesktop){
    return (
      <div style={{minHeight:"100vh",background:B.bg,fontFamily:"'Segoe UI',system-ui,sans-serif"}}>
        <Topbar/>
        <div style={{display:"flex",minHeight:"calc(100vh - 58px)"}}>
          <div style={{width:210,background:`linear-gradient(180deg,${B.navyDk},${B.navy})`,flexShrink:0,padding:"20px 0"}}>
            {NAVS.map(n=>(
              <button key={n.k} onClick={()=>setView(n.k)} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"11px 20px",border:"none",background:view===n.k?"rgba(255,255,255,.15)":"transparent",cursor:"pointer",textAlign:"left",borderLeft:view===n.k?`3px solid ${B.gold}`:"3px solid transparent",position:"relative"}}>
                <span style={{fontSize:18}}>{n.i}</span>
                <span style={{fontSize:13,fontWeight:700,color:view===n.k?"#E0B84A":"rgba(255,255,255,.7)"}}>{n.l}</span>
                {n.k==="applications"&&isAdmin&&(pendingLoans.length+pendingBulk.length)>0&&(
                  <span style={{position:"absolute",right:12,background:B.red,color:"#fff",fontSize:9,fontWeight:900,borderRadius:"50%",width:16,height:16,display:"flex",alignItems:"center",justifyContent:"center"}}>{pendingLoans.length+pendingBulk.length}</span>
                )}
              </button>
            ))}
          </div>
          <div style={{flex:1,padding:28,overflowY:"auto"}}>
            <div style={{maxWidth:900,margin:"0 auto"}}>
              {toast&&<Toast msg={toast.msg} type={toast.type}/>}
              {renderPage()}
            </div>
          </div>
        </div>
        {renderModal()}
      </div>
    );
  }

  return (
    <div style={{fontFamily:"'Segoe UI',system-ui,sans-serif",background:B.bg,minHeight:"100vh",maxWidth:480,margin:"0 auto",boxShadow:"0 0 40px rgba(0,0,0,.15)"}}>
      <div style={{background:`linear-gradient(135deg,${B.navyDk},${B.blue})`,position:"sticky",top:0,zIndex:50,boxShadow:"0 3px 16px rgba(17,30,74,.35)"}}>
        <Topbar/>
        <div style={{display:"flex",overflowX:"auto",padding:"0 6px 8px"}}>
          {NAVS.map(n=>(
            <button key={n.k} onClick={()=>setView(n.k)} style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"5px 10px",borderRadius:8,border:"none",cursor:"pointer",fontSize:11,fontWeight:700,background:view===n.k?"rgba(255,255,255,.18)":"transparent",color:view===n.k?"#E0B84A":"rgba(255,255,255,.65)",borderBottom:view===n.k?"2px solid #E0B84A":"2px solid transparent",position:"relative"}}>
              <span style={{fontSize:16}}>{n.i}</span>
              {n.l}
              {n.k==="applications"&&isAdmin&&(pendingLoans.length+pendingBulk.length)>0&&(
                <span style={{position:"absolute",top:2,right:4,background:B.red,color:"#fff",fontSize:8,fontWeight:900,borderRadius:"50%",width:14,height:14,display:"flex",alignItems:"center",justifyContent:"center"}}>{pendingLoans.length+pendingBulk.length}</span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div style={{padding:14,paddingBottom:24}}>
        {toast&&<Toast msg={toast.msg} type={toast.type}/>}
        {renderPage()}
      </div>
      {renderModal()}
    </div>
  );
}

export default function App(){
  return (
    <ErrorBoundary>
      <AppInner/>
    </ErrorBoundary>
  );
}

function LoginPage({members,onLogin}){
  const[id,setId]=useState(""); const[pw,setPw]=useState(""); const[err,setErr]=useState(""); const[show,setShow]=useState(false);
  const handle=()=>{
    const m=members.find(x=>x.id.toLowerCase()===id.trim().toLowerCase());
    if(!m||m.password!==pw){setErr(m?"Incorrect password.":"Member ID not found.");return;}
    onLogin(m);
  };
  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,#111E4A 0%,#1B2D6B 45%,#1565C0 100%)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{textAlign:"center",marginBottom:20}}>
        <Logo size={80}/>
        <p style={{fontSize:24,fontWeight:900,color:"#fff",letterSpacing:2,margin:"8px 0 2px"}}>AYIWOZA</p>
        <p style={{fontSize:10,color:"#E0B84A",letterSpacing:2.5,margin:0}}>COMMITTEE OF FRIENDS</p>
        <p style={{fontSize:9,color:"rgba(255,255,255,.4)",letterSpacing:2,margin:"4px 0 0"}}>AN'YEDUDU</p>
      </div>
      <div style={{background:"#fff",borderRadius:20,padding:24,width:"100%",maxWidth:380,boxShadow:"0 30px 80px rgba(0,0,0,.4)"}}>
        <p style={{fontWeight:800,fontSize:16,color:"#1B2D6B",textAlign:"center",margin:"0 0 16px"}}>Member Sign In</p>
        {err&&<div style={{background:"#FDECEC",color:"#C0392B",padding:9,borderRadius:9,fontSize:12,textAlign:"center",marginBottom:12,fontWeight:600}}>{err}</div>}
        <div style={{marginBottom:12}}>
          <label style={{display:"block",fontSize:11,fontWeight:700,color:"#4A5568",marginBottom:4,textTransform:"uppercase",letterSpacing:.5}}>Member ID</label>
          <input style={{width:"100%",background:"#F8F9FC",border:"1.5px solid #E3E8F0",borderRadius:9,padding:"10px 12px",fontSize:14,outline:"none",color:"#1a1a1a",boxSizing:"border-box"}} value={id} placeholder="e.g. AYI0001" onChange={e=>{setId(e.target.value);setErr("");}} onKeyDown={e=>e.key==="Enter"&&handle()}/>
        </div>
        <div style={{marginBottom:16}}>
          <label style={{display:"block",fontSize:11,fontWeight:700,color:"#4A5568",marginBottom:4,textTransform:"uppercase",letterSpacing:.5}}>Password</label>
          <div style={{position:"relative"}}>
            <input style={{width:"100%",background:"#F8F9FC",border:"1.5px solid #E3E8F0",borderRadius:9,padding:"10px 40px 10px 12px",fontSize:14,outline:"none",color:"#1a1a1a",boxSizing:"border-box"}} type={show?"text":"password"} value={pw} placeholder="Enter password" onChange={e=>{setPw(e.target.value);setErr("");}} onKeyDown={e=>e.key==="Enter"&&handle()}/>
            <button onClick={()=>setShow(!show)} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:16,color:"#8A96A8"}}>{show?"🙈":"👁"}</button>
          </div>
        </div>
        <button onClick={handle} style={{width:"100%",background:"linear-gradient(135deg,#1B2D6B,#1565C0)",color:"#fff",border:"none",borderRadius:10,padding:13,fontSize:15,fontWeight:800,cursor:"pointer",letterSpacing:1}}>SIGN IN</button>
        <p style={{textAlign:"center",marginTop:12,fontSize:11,color:"#8A96A8"}}>Default: <strong style={{color:"#1B2D6B"}}>Firstname@2026</strong></p>
      </div>
    </div>
  );
}