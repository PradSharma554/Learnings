import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from "@/organisms/NavBar";
import { useForms } from '../contexts/FormsContext';
import { Button } from '@/atoms/button';
import { Input } from '@/atoms/input';
import { Textarea } from '@/atoms/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/molecules/card';
import { RadioGroup, RadioGroupItem } from '@/molecules/radio-group';
import { Checkbox } from '@/atoms/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/molecules/select';
import { Label } from '@/atoms/label';
import { Alert, AlertDescription } from '@/atoms/alert';
import { CheckCircle, AlertCircle, FileText } from 'lucide-react';

const FormFiller = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const { forms, submitResponse } = useForms();
  
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const foundForm = forms.find(f => f.id === formId);
    if (foundForm) {
      setForm(foundForm);

      const initialAnswers = {};
      foundForm.questions.forEach(question => {
        if (question.type === 'checkboxes') {
          initialAnswers[question.id] = [];
        } else {
          initialAnswers[question.id] = '';
        }
      });
      setAnswers(initialAnswers);
    }
  }, [formId, forms]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));

    if (errors[questionId]) {
      setErrors(prev => ({
        ...prev,
        [questionId]: null
      }));
    }
  };

  const handleCheckboxChange = (questionId, optionValue, checked) => {
    setAnswers(prev => {
      const currentAnswers = prev[questionId] || [];
      if (checked) {
        return {
          ...prev,
          [questionId]: [...currentAnswers, optionValue]
        };
      } else {
        return {
          ...prev,
          [questionId]: currentAnswers.filter(answer => answer !== optionValue)
        };
      }
    });
    
    if (errors[questionId]) {
      setErrors(prev => ({
        ...prev,
        [questionId]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    form.questions.forEach(question => {
      if (question.required) {
        const answer = answers[question.id];
        
        if (question.type === 'checkboxes') {
          if (!answer || answer.length === 0) {
            newErrors[question.id] = 'This question is required';
          }
        } else {
          if (!answer || answer.trim() === '') {
            newErrors[question.id] = 'This question is required';
          }
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      submitResponse(formId, answers);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderQuestion = (question) => {
    const answer = answers[question.id];
    const error = errors[question.id];

    const questionContent = (
      <div className="space-y-4">
        <div>
          <Label className="text-base font-medium text-gray-900">
            {question.title}
            {question.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
        </div>

        {question.type === 'text' && (
          <Input
            value={answer || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            placeholder="Your answer"
            className={error ? 'border-red-500' : ''}
          />
        )}

        {question.type === 'paragraph' && (
          <Textarea
            value={answer || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            placeholder="Your answer"
            rows={4}
            className={error ? 'border-red-500' : ''}
          />
        )}

        {question.type === 'multiple-choice' && (
          <RadioGroup
            value={answer || ''}
            onValueChange={(value) => handleAnswerChange(question.id, value)}
            className={error ? 'border border-red-500 rounded-md p-2' : ''}
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                <Label htmlFor={`${question.id}-${index}`} className="font-normal">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {question.type === 'checkboxes' && (
          <div className={`space-y-2 ${error ? 'border border-red-500 rounded-md p-2' : ''}`}>
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`${question.id}-${index}`}
                  checked={(answer || []).includes(option)}
                  onCheckedChange={(checked) => handleCheckboxChange(question.id, option, checked)}
                />
                <Label htmlFor={`${question.id}-${index}`} className="font-normal">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        )}

        {question.type === 'dropdown' && (
          <Select
            value={answer || ''}
            onValueChange={(value) => handleAnswerChange(question.id, value)}
          >
            <SelectTrigger className={error ? 'border-red-500' : ''}>
              <SelectValue placeholder="Choose an option" />
            </SelectTrigger>
            <SelectContent>
              {question.options.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {question.type === 'date' && (
          <Input
            type="date"
            value={answer || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className={`w-48 ${error ? 'border-red-500' : ''}`}
          />
        )}

        {question.type === 'time' && (
          <Input
            type="time"
            value={answer || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className={`w-48 ${error ? 'border-red-500' : ''}`}
          />
        )}

        {error && (
          <p className="text-sm text-red-500 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {error}
          </p>
        )}
      </div>
    );

    return (
      <Card key={question.id} className="mb-6">
        <CardContent className="p-6">
          {questionContent}
        </CardContent>
      </Card>
    );
  };

  if (!form) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Form not found</h2>
          <p className="text-gray-500 mb-4">The form you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')}>
            <span className='hidden sm:inline'>Back to Forms</span>
          </Button>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Response submitted</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your response! Your answers have been recorded.
            </p>
            <div className="space-y-2">
              <Button onClick={() => navigate('/')} className="w-full">
                Back to Forms
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsSubmitted(false);
                  setAnswers({});

                  const initialAnswers = {};
                  form.questions.forEach(question => {
                    if (question.type === 'checkboxes') {
                      initialAnswers[question.id] = [];
                    } else {
                      initialAnswers[question.id] = '';
                    }
                  });
                  setAnswers(initialAnswers);
                }}
                className="w-full"
              >
                Submit another response
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar/>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       
        <Card className="mb-8">
          <CardHeader className="border-l-4 border-l-purple-500">
            <CardTitle className="text-2xl font-bold text-gray-900">
              {form.title}
            </CardTitle>
            {form.description && (
              <CardDescription className="text-base text-gray-600 mt-2">
                {form.description}
              </CardDescription>
            )}
          </CardHeader>
        </Card>

        {form.questions.some(q => q.required) && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Fields marked with an asterisk (*) are required.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {form.questions.map(renderQuestion)}

          <div className="mt-8">
            <Button 
              type="submit"
              size="lg" 
              disabled={isSubmitting}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormFiller;