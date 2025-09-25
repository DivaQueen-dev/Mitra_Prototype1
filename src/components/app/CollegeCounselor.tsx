import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Phone, Mail, Users, UserPlus, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Counselor {
  id: string;
  name: string;
  expertise: string[];
  contact: {
    email: string;
    phone: string;
  };
  availability: string;
  experience: string;
}

interface Volunteer {
  id: string;
  name: string;
  course: string;
  year: string;
  specialization: string;
  rating: number;
}

const CollegeCounselor: React.FC = () => {
  const [showBooking, setShowBooking] = useState(false);
  const [showVolunteerForm, setShowVolunteerForm] = useState(false);
  const [volunteerApplication, setVolunteerApplication] = useState({
    name: '',
    course: '',
    year: '',
    specialization: '',
    motivation: '',
  });

  const counselors: Counselor[] = [
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      expertise: ['Academic Stress', 'Anxiety Management', 'Career Counseling'],
      contact: {
        email: 'priya.sharma@college.edu',
        phone: '+91 9876543210'
      },
      availability: 'Mon-Fri, 10 AM - 4 PM',
      experience: '8 years in student counseling'
    },
    {
      id: '2',
      name: 'Prof. Rajesh Kumar',
      expertise: ['Depression Support', 'Relationship Issues', 'Study Skills'],
      contact: {
        email: 'rajesh.kumar@college.edu',
        phone: '+91 9876543211'
      },
      availability: 'Tue-Sat, 2 PM - 6 PM',
      experience: '12 years in mental health'
    }
  ];

  const volunteers: Volunteer[] = [
    {
      id: '1',
      name: 'Aman Singh',
      course: 'Computer Science',
      year: '3rd Year',
      specialization: 'Coding & Technical Help',
      rating: 4.8
    },
    {
      id: '2',
      name: 'Priya Patel',
      course: 'Psychology',
      year: '4th Year',
      specialization: 'Mental Wellness & Study Tips',
      rating: 4.9
    },
    {
      id: '3',
      name: 'Rohit Gupta',
      course: 'Business Administration',
      year: '2nd Year',
      specialization: 'Career Guidance & Networking',
      rating: 4.6
    }
  ];

  const handleVolunteerApply = () => {
    // Save application to localStorage
    const applications = JSON.parse(localStorage.getItem('volunteer-applications') || '[]');
    applications.push({
      id: Date.now().toString(),
      ...volunteerApplication,
      appliedAt: new Date().toISOString()
    });
    localStorage.setItem('volunteer-applications', JSON.stringify(applications));
    
    setShowVolunteerForm(false);
    setVolunteerApplication({
      name: '',
      course: '',
      year: '',
      specialization: '',
      motivation: '',
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-gradient">College Counselor Section</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Connect with professional counselors and peer volunteers for academic and personal support.
        </p>
      </div>

      {/* Professional Counselors */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Professional Counselors</h3>
          <Button 
            onClick={() => setShowBooking(true)}
            className="btn-luxury"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book Appointment
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {counselors.map((counselor) => (
            <motion.div
              key={counselor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="luxury-card"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-violet rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{counselor.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{counselor.experience}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex flex-wrap gap-2">
                      {counselor.expertise.map((skill, index) => (
                        <span key={index} className="badge-emerald">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-primary" />
                      <span>{counselor.contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>{counselor.contact.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{counselor.availability}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Student Volunteers */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Student Volunteers</h3>
          <Button 
            onClick={() => setShowVolunteerForm(true)}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Apply as Volunteer
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {volunteers.map((volunteer) => (
            <motion.div
              key={volunteer.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="luxury-card text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-emerald to-violet rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              
              <h4 className="font-semibold text-lg mb-1">{volunteer.name}</h4>
              <p className="text-sm text-muted-foreground mb-2">{volunteer.course} - {volunteer.year}</p>
              
              <div className="badge-violet mb-4">
                {volunteer.specialization}
              </div>
              
              <div className="flex items-center justify-center space-x-1 mb-4">
                <span className="text-gold">★</span>
                <span className="font-medium">{volunteer.rating}</span>
              </div>
              
              <Button size="sm" variant="outline">
                Connect
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="luxury-card p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-lg font-semibold mb-4">Book Appointment</h3>
            <p className="text-muted-foreground mb-4">
              Please contact the counselor directly using their provided contact information to schedule an appointment.
            </p>
            <Button onClick={() => setShowBooking(false)} className="w-full">
              Close
            </Button>
          </motion.div>
        </div>
      )}

      {/* Volunteer Application Form */}
      {showVolunteerForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="luxury-card p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-lg font-semibold mb-4">Apply as Student Volunteer</h3>
            
            <div className="space-y-4">
              <Input
                placeholder="Your Name"
                value={volunteerApplication.name}
                onChange={(e) => setVolunteerApplication(prev => ({ ...prev, name: e.target.value }))}
              />
              
              <Input
                placeholder="Course/Program"
                value={volunteerApplication.course}
                onChange={(e) => setVolunteerApplication(prev => ({ ...prev, course: e.target.value }))}
              />
              
              <Input
                placeholder="Year of Study"
                value={volunteerApplication.year}
                onChange={(e) => setVolunteerApplication(prev => ({ ...prev, year: e.target.value }))}
              />
              
              <Input
                placeholder="Area of Specialization/Help"
                value={volunteerApplication.specialization}
                onChange={(e) => setVolunteerApplication(prev => ({ ...prev, specialization: e.target.value }))}
              />
              
              <Textarea
                placeholder="Why do you want to volunteer? How can you help other students?"
                value={volunteerApplication.motivation}
                onChange={(e) => setVolunteerApplication(prev => ({ ...prev, motivation: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="flex space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowVolunteerForm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleVolunteerApply}
                className="btn-luxury flex-1"
                disabled={!volunteerApplication.name || !volunteerApplication.course}
              >
                Submit Application
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CollegeCounselor;