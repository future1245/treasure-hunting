import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle } from 'lucide-react';

import { isCodeAccessibleByTeam, getTeamColor } from '@/config/treasureConfig';
import { CLUES } from '@/config/clues';

export default function TreasureCodePage() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  const [teamNumber, setTeamNumber] = useState<number | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // ---------------- LOAD TEAM ----------------
  useEffect(() => {
    const storedTeam = localStorage.getItem('treasureHuntTeam');

    if (!storedTeam) {
      navigate(`/treasure?redirect=${code}`);
      return;
    }

    const team = parseInt(storedTeam);
    setTeamNumber(team);

    if (code) {
      setIsAuthorized(
        isCodeAccessibleByTeam(code.toUpperCase(), team)
      );
    }
  }, [code, navigate]);

  if (teamNumber === null) return null;

  const teamColor = getTeamColor(teamNumber);
  const clueData = CLUES[code?.toUpperCase() || ""];

  // ---------------- WHATSAPP FUNCTION ----------------
  const handleWhatsAppWin = () => {
    const team = localStorage.getItem("treasureHuntTeam");
    if (!team) return;

    const link =
      `https://wa.me/918861579575?text=🏆%20Team%20${team}%20finished%20the%20treasure%20hunt%20FIRST!`;

    window.location.href = link;
  };

  // ---------------- UNAUTHORIZED ----------------
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Card className="p-6 text-center">
          <AlertCircle className="text-red-500 w-12 h-12 mx-auto" />
          <CardTitle className="text-red-500">Unauthorized</CardTitle>
          <p>Not for Team {teamNumber}</p>

          <Button
            onClick={() => navigate('/treasure')}
            className="mt-4"
          >
            Go Back
          </Button>
        </Card>
      </div>
    );
  }

  // ---------------- MAIN ----------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">

      <Card
        className="max-w-2xl w-full text-center border-2"
        style={{
          borderColor: teamColor.accent,
          boxShadow: `0 0 25px ${teamColor.glow}`
        }}
      >

        <CardHeader>
          <CardTitle style={{ color: teamColor.accent }}>
            TREASURE HUNT
          </CardTitle>

          <Badge>TEAM {teamNumber}</Badge>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* DEBUG LINE */}
          <h2 style={{color:"yellow"}}>
            VERSION 2 LIVE
          </h2>

          {/* CLUE */}
          <p
            className="text-xl"
            style={{ color: teamColor.accent }}
          >
            {clueData?.text || "No clue"}
          </p>

          {/* LINK */}
          {clueData?.link && (
            <a
              href={clueData.link}
              target="_blank"
              rel="noreferrer"
              className="underline text-blue-400 block"
            >
              Open Clue Link
            </a>
          )}

          {/* FINAL BUTTON */}
          {code?.toUpperCase() === "FIN00" && (
            <Button
              onClick={handleWhatsAppWin}
              className="bg-green-600 hover:bg-green-700 text-white text-lg"
            >
              🏆 Claim Victory on WhatsApp
            </Button>
          )}

          {/* CODE */}
          <div>
            <p className="text-gray-400">Scanned Code</p>
            <Badge>{code?.toUpperCase()}</Badge>
          </div>

          <Button
            onClick={() => navigate('/treasure')}
            variant="outline"
          >
            Back to Home
          </Button>

        </CardContent>
      </Card>
    </div>
  );
}
