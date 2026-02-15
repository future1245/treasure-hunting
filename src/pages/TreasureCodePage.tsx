import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Sparkles } from 'lucide-react';

import { isCodeAccessibleByTeam, getTeamColor } from '@/config/treasureConfig';
import { CLUES } from '@/config/clues';

export default function TreasureCodePage() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  const [teamNumber, setTeamNumber] = useState<number | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

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

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-4">
        <Card className="p-6 text-center">
          <AlertCircle className="text-red-500 w-12 h-12 mx-auto" />
          <CardTitle className="text-red-500 mt-2">
            Unauthorized QR Code
          </CardTitle>

          <Button onClick={() => navigate('/treasure')} className="mt-4">
            Go Back
          </Button>
        </Card>
      </div>
    );
  }

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

          {/* LINK IF EXISTS */}
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

          <div>
            <p>Scanned Code</p>
            <Badge>{code?.toUpperCase()}</Badge>
          </div>

          <Button onClick={() => navigate('/treasure')}>
            Back to Home
          </Button>

        </CardContent>
      </Card>

    </div>
  );
}
