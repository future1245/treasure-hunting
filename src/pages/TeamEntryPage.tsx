import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { VALID_TEAMS } from '@/config/treasureConfig';

export default function TeamEntryPage() {
  const [teamNumber, setTeamNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleEnter = () => {
    const team = parseInt(teamNumber);

    if (!teamNumber || isNaN(team)) {
      setError('Please enter a valid team number');
      return;
    }

    if (!VALID_TEAMS.includes(team)) {
      setError('Team number must be between 101 and 110');
      return;
    }

    localStorage.setItem('treasureHuntTeam', teamNumber);

    const redirectCode = searchParams.get('redirect');
    if (redirectCode) {
      navigate(`/treasure/${redirectCode}`);
    } else {
      navigate('/treasure/start');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Treasure Hunt Team Login
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="team" className="text-sm font-medium text-muted-foreground">
              Enter Team Number (101-110)
            </label>
            <Input
              id="team"
              type="number"
              placeholder="Team Number"
              value={teamNumber}
              onChange={(e) => {
                setTeamNumber(e.target.value);
                setError('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleEnter();
                }
              }}
              className="text-lg text-center"
              min={101}
              max={110}
            />
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
          </div>
          <Button
            onClick={handleEnter}
            className="w-full text-lg h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            size="lg"
          >
            Enter Hunt
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
