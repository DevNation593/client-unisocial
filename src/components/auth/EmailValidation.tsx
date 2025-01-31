import React, { useState, FormEvent } from 'react';
import { Button } from '../shared/button';
import { Input } from '../shared/input';
import { Alert, AlertDescription } from '../shared/Alert';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/card';
import { authApi } from '../../api/auth';

const EmailValidation = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authApi.verifyEmail(code);
      setVerified(true);
    } catch (err) {
      setError('Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Verify Email</CardTitle>
      </CardHeader>
      <CardContent>
        {verified ? (
          <Alert>
            <AlertDescription>Email verified successfully!</AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter verification code"
              required
            />
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify Email'}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default EmailValidation;