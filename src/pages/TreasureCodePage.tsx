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

  // ---------------- UNAUTHORIZED ----------------
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-2xl border-red-500/50 bg-gray-900/80 backdrop-blur">
          <CardHeader className="text-center space-y-4">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
            <CardTitle className="text-2xl font-bold text-red-500">
              Unauthorized QR Code for your team
            </CardTitle>
          </CardHeader>

          <CardContent className="text-center space-y-4">
            <p>This QR is not for Team {teamNumber}</p>

            <Badge className="font-mono text-lg px-4 py-2">
              {code?.toUpperCase()}
            </Badge>

            <Button
              onClick={() => navigate('/treasure')}
              variant="destructive"
              className="w-full"
            >
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ---------------- AUTHORIZED ----------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">

      <div
        className="w-full max-w-2xl"
        style={{ filter: `drop-shadow(0 0 20px ${teamColor.glow})` }}
      >

        <Card
          className="bg-gray-900/90 border-2 shadow-2xl"
          style={{
            borderColor: teamColor.accent,
            boxShadow: `0 0 30px ${teamColor.glow}`
          }}
        >

          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center gap-2">
              <Sparkles style={{ color: teamColor.accent }} />
              <CardTitle style={{ color: teamColor.accent }}>
                TREASURE HUNT
              </CardTitle>
              <Sparkles style={{ color: teamColor.accent }} />
            </div>

            <Badge
              style={{
                borderColor: teamColor.accent,
                color: teamColor.accent
              }}
            >
              TEAM {teamNumber}
            </Badge>
          </CardHeader>

          <CardContent className="space-y-6 text-center">

            {/* -------- CLUE DISPLAY -------- */}
            <div
              className="p-8 rounded-lg border space-y-4"
              style={{ borderColor: teamColor.accent }}
            >

              <p
                className="text-xl"
                style={{ color: teamColor.accent }}
              >
                {clueData?.text || "Clue will be added later"}
              </p>

              {clueData?.link && (
                <a
                  href={clueData.link}
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-blue-400"
                >
                  Open Clue Link
                </a>
              )}

              <div>
                <p className="text-gray-400">Scanned Code</p>
                <Badge className="font-mono text-xl">
                  {code?.toUpperCase()}
                </Badge>
              </div>

            </div>

            <Button
              onClick={() => navigate('/treasure')}
              variant="outline"
              className="w-full"
              style={{
                borderColor: teamColor.accent,
                color: teamColor.accent
              }}
            >
              Back to Home
            </Button>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
