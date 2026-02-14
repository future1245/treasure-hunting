// ---------------- VALID TEAMS ----------------
export const VALID_TEAMS = [
  101,102,103,104,105,
  106,107,108,109,110
];

// ---------------- TEAM COLORS ----------------
export const TEAM_COLORS = {
  101:{ name:'blue',   accent:'rgb(59,130,246)', glow:'rgba(59,130,246,0.5)' },
  102:{ name:'cyan',   accent:'rgb(6,182,212)', glow:'rgba(6,182,212,0.5)' },
  103:{ name:'green',  accent:'rgb(34,197,94)', glow:'rgba(34,197,94,0.5)' },
  104:{ name:'lime',   accent:'rgb(163,230,53)', glow:'rgba(163,230,53,0.5)' },
  105:{ name:'purple', accent:'rgb(168,85,247)', glow:'rgba(168,85,247,0.5)' },
  106:{ name:'pink',   accent:'rgb(236,72,153)', glow:'rgba(236,72,153,0.5)' },
  107:{ name:'orange', accent:'rgb(249,115,22)', glow:'rgba(249,115,22,0.5)' },
  108:{ name:'yellow', accent:'rgb(234,179,8)', glow:'rgba(234,179,8,0.5)' },
  109:{ name:'red',    accent:'rgb(239,68,68)', glow:'rgba(239,68,68,0.5)' },
  110:{ name:'indigo', accent:'rgb(99,102,241)', glow:'rgba(99,102,241,0.5)' },
};

// ---------------- CODE ACCESS ----------------
export const CODE_ACCESS_MAP: Record<string, number[]> = {

  // -------- STARTING CODES --------
  A9K2X:[101,102],
  Q7M4L:[103,104],
  Z3P8R:[105,106],
  B6T1N:[107,108],
  X2F9C:[109,110],

  // -------- TEAM 101 & 102 --------
  M5R7K:[101,102],
  L8A4D:[101,102],
  P1Q6S:[101,102],
  N7Z2B:[101,102],
  C4X5M:[101,102],

  // -------- TEAM 103 & 104 --------
  R9L1A:[103,104],
  K3T6P:[103,104],
  D2B8Q:[103,104],
  S7M1X:[103,104],
  F5C9L:[103,104],

  // -------- TEAM 105 & 106 --------
  H4R2N:[105,106],
  Y6P3K:[105,106],
  J1S8A:[105,106],
  U7D5M:[105,106],
  E2L9X:[105,106],

  // -------- TEAM 107 & 108 --------
  W8K4B:[107,108],
  G3N1P:[107,108],
  T5Q7R:[107,108],
  V2C6S:[107,108],
  O9F1D:[107,108],

  // -------- TEAM 109 & 110 --------
  I4M8L:[109,110],
  NP12R:[109,110],
  FUT21:[109,110],
  QWER1:[109,110],
  ASD12:[109,110],

  // -------- SEND TO FINAL --------
  END32:[101,102,103,104,105,106,107,108,109,110],

  // -------- FINAL TREASURE --------
  FIN00:[101,102,103,104,105,106,107,108,109,110],
};

// ---------------- ACCESS CHECK ----------------
export const isCodeAccessibleByTeam = (
  code:string,
  teamNumber:number
):boolean => {

  const allowedTeams = CODE_ACCESS_MAP[code.toUpperCase()];
  if(!allowedTeams) return false;

  return allowedTeams.includes(teamNumber);
};

// ---------------- GET TEAM COLOR ----------------
export const getTeamColor = (teamNumber:number) => {
  return TEAM_COLORS[
    teamNumber as keyof typeof TEAM_COLORS
  ] || TEAM_COLORS[101];
};
