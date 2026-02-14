import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QrCode, LogOut } from 'lucide-react';
import { getTeamColor } from '@/config/treasureConfig';

export default function StartPage() {
  const navigate = useNavigate();
  const [teamNumber, setTeamNumber] = useState<number | null>(null);

  useEffect(() => {
    const storedTeam = localStorage.getItem('treasureHuntTeam');

    if (!storedTeam) {
      navigate('/treasure');
      return;
    }

    setTeamNumber(parseInt(storedTeam));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('treasureHuntTeam');
    navigate('/treasure');
  };

  if (teamNumber === null) {
    return null;
  }

  const teamColor = getTeamColor(teamNumber);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div
        className="w-full max-w-2xl"
        style={{
          filter: `drop-shadow(0 0 20px ${teamColor.glow})`,
        }}
      >
        <Card
          className="shadow-2xl bg-gray-900/90 backdrop-blur border-2"
          style={{
            borderColor: teamColor.accent,
            boxShadow: `0 0 30px ${teamColor.glow}`,
          }}
        >
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-between items-center">
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
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-gray-400 hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
            <CardTitle
              className="text-4xl font-bold tracking-wider"
              style={{ color: teamColor.accent }}
            >
              TREASURE HUNT
            </CardTitle>
            <p className="text-gray-400 text-lg">Welcome to the adventure!</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div
              className="relative overflow-hidden rounded-lg border-2 p-12 flex flex-col items-center justify-center space-y-6"
              style={{
                borderColor: teamColor.accent,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
              }}
            >
              <QrCode
                className="w-24 h-24"
                style={{ color: teamColor.accent }}
              />
              <div className="text-center space-y-2">
                <h3
                  className="text-2xl font-bold"
                  style={{ color: teamColor.accent }}
                >
                  Ready to Hunt?
                </h3>
                <p className="text-gray-400 max-w-md">
                  Scan a QR code to begin your treasure hunt journey. Each code will reveal a new clue to guide you on your adventure.
                </p>
              </div>
            </div>

            <div
              className="p-6 rounded-lg border space-y-3"
              style={{
                borderColor: `${teamColor.glow}`,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
              }}
            >
              <h4 className="font-semibold text-lg" style={{ color: teamColor.accent }}>
                Instructions:
              </h4>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>1. Scan the QR codes you find along your path</li>
                <li>2. Each code will reveal a clue for your next destination</li>
                <li>3. Follow the clues to complete the treasure hunt</li>
                <li>4. Only codes assigned to your team will work</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
