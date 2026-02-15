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

  // ---------------- UNAUTHORIZED ----------------
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-4">
        <Card className="p-6 text-center">
          <AlertCircle className="text-red-500 w-12 h-12 mx-auto" />

          <CardTitle className="text-red-500 mt-2">
            Unauthorized QR Code
          </CardTitle>

          <p className="mt-2">
            This QR is not for your team
          </p>

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

  // ---------------- MAIN PAGE ----------------
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">

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

          {/* CLUE TEXT */}
          <p
            className="text-xl"
            style={{ color: teamColor.accent }}
          >
            {clueData?.text || "Clue will be added later"}
          </p>

          {/* OPTIONAL LINK (Drive / WhatsApp / etc) */}
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

          {/* CODE DISPLAY */}
          <div>
            <p className="text-gray-400">Scanned Code</p>
            <Badge className="font-mono text-lg">
              {code?.toUpperCase()}
            </Badge>
          </div>

          <Button onClick={() => navigate('/treasure')}>
            Back to Home
          </Button>

        </CardContent>
      </Card>

    </div>
  );
}
