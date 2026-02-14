import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Sparkles } from 'lucide-react';
import { isCodeAccessibleByTeam, getTeamColor } from '@/config/treasureConfig';

export default function TreasureCodePage() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [teamNumber, setTeamNumber] = useState<number | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    const storedTeam = localStorage.getItem('treasureHuntTeam');

    if (!storedTeam) {
      navigate(`/treasure?redirect=${code}`);
      return;
    }

    const team = parseInt(storedTeam);
    setTeamNumber(team);

    if (code) {
      const authorized = isCodeAccessibleByTeam(code.toUpperCase(), team);
      setIsAuthorized(authorized);
    }
  }, [code, navigate]);

  if (teamNumber === null) {
    return null;
  }

  const teamColor = getTeamColor(teamNumber);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-2xl border-red-500/50 bg-gray-900/80 backdrop-blur">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <AlertCircle className="w-16 h-16 text-red-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-red-500">
              Unauthorized QR Code for your team
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center text-muted-foreground">
              <p className="mb-2">This QR code is not accessible to Team {teamNumber}</p>
              <Badge variant="outline" className="font-mono text-lg px-4 py-2 bg-red-950/50 border-red-500/50">
                {code?.toUpperCase()}
              </Badge>
            </div>
            <Button
              onClick={() => navigate('/treasure')}
              variant="destructive"
              className="w-full text-lg h-12"
              size="lg"
            >
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div
        className="w-full max-w-2xl animate-pulse-slow"
        style={{
          filter: `drop-shadow(0 0 20px ${teamColor.glow})`,
        }}
      >
        <Card
          className="shadow-2xl bg-gray-900/90 backdrop-blur border-2 transition-all duration-300"
          style={{
            borderColor: teamColor.accent,
            boxShadow: `0 0 30px ${teamColor.glow}, inset 0 0 30px ${teamColor.glow}`,
          }}
        >
          <CardHeader className="text-center space-y-4 pb-4">
            <div className="flex items-center justify-center gap-2">
              <Sparkles
                className="w-8 h-8"
                style={{ color: teamColor.accent }}
              />
              <CardTitle
                className="text-3xl font-bold tracking-wider"
                style={{ color: teamColor.accent }}
              >
                TREASURE HUNT
              </CardTitle>
              <Sparkles
                className="w-8 h-8"
                style={{ color: teamColor.accent }}
              />
            </div>
            <div className="flex justify-center">
              <Badge
                variant="outline"
                className="text-xs px-3 py-1"
                style={{
                  borderColor: teamColor.accent,
                  color: teamColor.accent,
                  backgroundColor: `${teamColor.glow}`,
                }}
              >
                TEAM {teamNumber}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div
              className="relative overflow-hidden rounded-lg border-2 p-8 min-h-[200px] flex flex-col items-center justify-center space-y-4"
              style={{
                borderColor: teamColor.accent,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
              }}
            >
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  background: `linear-gradient(45deg, ${teamColor.glow} 25%, transparent 25%, transparent 75%, ${teamColor.glow} 75%, ${teamColor.glow}), linear-gradient(45deg, ${teamColor.glow} 25%, transparent 25%, transparent 75%, ${teamColor.glow} 75%, ${teamColor.glow})`,
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 10px 10px',
                }}
              />

              <div className="relative z-10 text-center space-y-4">
                <p
                  className="text-xl font-medium tracking-wide"
                  style={{ color: teamColor.accent }}
                >
                  Clue will be displayed here later
                </p>

                <div className="pt-4">
                  <p className="text-sm text-gray-400 mb-2">Scanned Code:</p>
                  <Badge
                    variant="outline"
                    className="font-mono text-2xl px-6 py-3 tracking-widest"
                    style={{
                      borderColor: teamColor.accent,
                      color: teamColor.accent,
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    }}
                  >
                    {code?.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div
                className="text-center p-4 rounded-lg border"
                style={{
                  borderColor: `${teamColor.glow}`,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                }}
              >
                <p className="text-sm text-gray-400">Status</p>
                <p
                  className="text-lg font-bold"
                  style={{ color: teamColor.accent }}
                >
                  ACTIVE
                </p>
              </div>
              <div
                className="text-center p-4 rounded-lg border"
                style={{
                  borderColor: `${teamColor.glow}`,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                }}
              >
                <p className="text-sm text-gray-400">Team</p>
                <p
                  className="text-lg font-bold"
                  style={{ color: teamColor.accent }}
                >
                  {teamNumber}
                </p>
              </div>
            </div>

            <Button
              onClick={() => navigate('/treasure')}
              variant="outline"
              className="w-full text-lg h-12"
              style={{
                borderColor: teamColor.accent,
                color: teamColor.accent,
              }}
              size="lg"
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
