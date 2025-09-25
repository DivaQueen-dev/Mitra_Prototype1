import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Lock, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface InstitutionSelectorProps {
  onInstitutionSelected: (institution: string, passkey: string) => void;
}

const InstitutionSelector: React.FC<InstitutionSelectorProps> = ({ onInstitutionSelected }) => {
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const [passkey, setPasskey] = useState('');
  const [step, setStep] = useState(1);

  const institutions = [
    { id: 'delhi-univ', name: 'University of Delhi' },
    { id: 'iit-delhi', name: 'IIT Delhi' },
    { id: 'bits-pilani', name: 'BITS Pilani' },
    { id: 'nit-delhi', name: 'NIT Delhi' },
    { id: 'jamia-millia', name: 'Jamia Millia Islamia' },
    { id: 'other', name: 'Other Institution' },
  ];

  const handleInstitutionSelect = (institution: string) => {
    setSelectedInstitution(institution);
    setStep(2);
  };

  const handlePasskeySubmit = () => {
    if (passkey.trim()) {
      // Mock validation - in real app, this would be an API call
      const validPasskeys = {
        'delhi-univ': 'DU2024',
        'iit-delhi': 'IIT2024',
        'bits-pilani': 'BITS2024', 
        'nit-delhi': 'NIT2024',
        'jamia-millia': 'JMI2024',
        'other': 'DEMO2024'
      };

      // For demo purposes, accept any numeric passkey
      if (/^\d+$/.test(passkey)) {
        localStorage.setItem('mitra_institution', selectedInstitution);
        localStorage.setItem('mitra_passkey', passkey);
        onInstitutionSelected(selectedInstitution, passkey);
      } else {
        alert('Invalid passkey format. Please enter a numeric passkey provided by your institution.\n\nFor demo purposes, any number will work (e.g., 12345).');
      }
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full mx-auto"
      >
        <div className="luxury-card p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-violet rounded-full flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-2xl font-bold mb-2 text-gradient">
            Academic Dashboard Access
          </h2>
          
          <p className="text-muted-foreground mb-8">
            Please select your institution and enter your assigned passkey to access academic features.
          </p>

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <h3 className="font-semibold mb-4">Select Your Institution</h3>
              <Select onValueChange={handleInstitutionSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose your institution" />
                </SelectTrigger>
                <SelectContent>
                  {institutions.map((institution) => (
                    <SelectItem key={institution.id} value={institution.id}>
                      {institution.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Lock className="w-4 h-4 text-primary" />
                <h3 className="font-semibold">Enter Institution Passkey</h3>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Institution: <span className="font-medium">
                  {institutions.find(i => i.id === selectedInstitution)?.name}
                </span>
              </p>

              <Input
                type="password"
                placeholder="Enter your institution passkey"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                className="mb-4"
              />

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handlePasskeySubmit}
                  disabled={!passkey.trim()}
                  className="btn-luxury flex-1"
                >
                  Access Dashboard
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                Don't have a passkey? Contact your institution's academic office.
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default InstitutionSelector;