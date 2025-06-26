import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForms } from '../contexts/FormsContext';
import { Button } from '@/atoms/button';
import { Input } from '@/atoms/input';
import { Textarea } from '@/atoms/textarea';
import { Card, CardContent, CardHeader } from '@/molecules/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/molecules/select';
import { Switch } from '@/atoms/switch';
import { Label } from '@/atoms/label';
import FormSaved from '@/organisms/FormSaved';
import QuestionEditor from '@/organisms/QuestionEditor';

import {
  Plus,
  Trash2,
  Copy,
  GripVertical,
  Type,
  AlignLeft,
  List,
  CheckSquare,
  Circle,
  Calendar,
  Clock,
  FileText,
  Eye,
  Save,
  ArrowLeft
} from 'lucide-react';

const QUESTION_TYPES = [
  { value: 'text', label: 'Short answer', icon: Type },
  { value: 'paragraph', label: 'Paragraph', icon: AlignLeft },
  { value: 'multiple-choice', label: 'Multiple choice', icon: Circle },
  { value: 'checkboxes', label: 'Checkboxes', icon: CheckSquare },
  { value: 'dropdown', label: 'Dropdown', icon: List },
  { value: 'date', label: 'Date', icon: Calendar },
  { value: 'time', label: 'Time', icon: Clock }
];

const FormBuilder = () => {
  const navigate = useNavigate();
  const { formId } = useParams();
  const { forms, createForm, updateForm } = useForms();
  const [formSaved, setFormSaved] = useState(false);
  
  const [formData, setFormData] = useState({
    title: 'Untitled form',
    description: '',
    questions: []
  });
  
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (formId) {
      const existingForm = forms.find(form => String(form.id) === String(formId));
      console.log('Found form:', existingForm);
      if (existingForm) {
        setFormData({
          title: existingForm.title,
          description: existingForm.description,
          questions: existingForm.questions
        });
        setIsEditing(true);
      }
    }
  }, [formId, forms]);

  const handleFormTitleChange = (value) => {
    setFormData(prev => ({ ...prev, title: value }));
  };

  const handleFormDescriptionChange = (value) => {
    setFormData(prev => ({ ...prev, description: value }));
  };

  const addQuestion = (type = 'text') => {
    const newQuestion = {
      id: `q${Date.now()}`,
      type,
      title: 'Untitled Question',
      required: false,
      options: type === 'multiple-choice' || type === 'checkboxes' || type === 'dropdown' 
        ? ['Option 1'] 
        : []
    };
    
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
    
    setActiveQuestion(newQuestion.id);
  };

  const updateQuestion = (questionId, updates) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId ? { ...q, ...updates } : q
      )
    }));
  };

  const deleteQuestion = (questionId) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId)
    }));
    if (activeQuestion === questionId) {
      setActiveQuestion(null);
    }
  };

  const duplicateQuestion = (questionId) => {
    const questionToDuplicate = formData.questions.find(q => q.id === questionId);
    if (questionToDuplicate) {
      const duplicatedQuestion = {
        ...questionToDuplicate,
        id: `q${Date.now()}`,
        title: `${questionToDuplicate.title} (Copy)`
      };
      
      const questionIndex = formData.questions.findIndex(q => q.id === questionId);
      const newQuestions = [...formData.questions];
      newQuestions.splice(questionIndex + 1, 0, duplicatedQuestion);
      
      setFormData(prev => ({ ...prev, questions: newQuestions }));
    }
  };

  const addOption = (questionId) => {
    const question = formData.questions.find(q => q.id === questionId);
    const newOptionIndex = question.options.length + 1;
    updateQuestion(questionId, {
      options: [...question.options, `Option ${newOptionIndex}`]
    });
  };

  const updateOption = (questionId, optionIndex, value) => {
    const question = formData.questions.find(q => q.id === questionId);
    const newOptions = [...question.options];
    newOptions[optionIndex] = value;
    updateQuestion(questionId, { options: newOptions });
  };

  const removeOption = (questionId, optionIndex) => {
    const question = formData.questions.find(q => q.id === questionId);
    const newOptions = question.options.filter((_, index) => index !== optionIndex);
    updateQuestion(questionId, { options: newOptions });
  };

  const handleSave = () => {
    if (isEditing) {
      updateForm(formId, formData);
    } 
    else {
      createForm(formData);
    }
    setFormSaved(true);
  };

  const handlePreview = () => {
    if (isEditing) {
      navigate(`/form/${formId}`);
    } else {
      const newFormId = createForm(formData);
      navigate(`/form/${newFormId}`);
    }
  };

  return formSaved ? (
    <FormSaved
      onCreateAnother={() => {
        setFormSaved(false);
        setFormData({
          title: 'Untitled form',
          description: '',
          questions: []
        });
        setIsEditing(false);
      }}
    />
    ) : (

  <div className="">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between h-16">

            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="!px-2"
              >

                <ArrowLeft className="w-4 h-4 mr-2 px-0" />
                  <span className="hidden sm:inline">Back</span>
              </Button>
              
              <Input
                value={formData.title}
                onChange={(e) => handleFormTitleChange(e.target.value)}
                className="text-lg font-semibold border-none shadow-none p-0 focus-visible:ring-0 max-w-md"
                placeholder="Form title"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handlePreview} className="hover:cursor-pointer">
                <Eye className="w-4 h-4 sm:mr-2 mx-auto" />
                  <span className="hidden sm:inline">Preview</span>
              </Button>
              
              <Button onClick={handleSave} className="hover:cursor-pointer">
                <Save className="w-4 h-4 sm:mr-2 mx-auto" />
                <span className="hidden sm:inline">Save</span>
              </Button>
            </div>

          </div>
        </div>
      </div>

      {/* Initial Empty Data */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-6">
          <CardContent className="p-6">
            <Textarea
              value={formData.description}
              onChange={(e) => handleFormDescriptionChange(e.target.value)}
              className="border-none shadow-none p-0 focus-visible:ring-0 resize-none"
              placeholder="Form description"
              rows={2}
            />
          </CardContent>
        </Card>

        {/* Actual Questions */}
        <div className="space-y-4">
          {formData.questions.map((question) => (
            <QuestionEditor
              key={question.id}
              question={question}
              activeQuestion={activeQuestion}
              setActiveQuestion={setActiveQuestion}
              updateQuestion={updateQuestion}
              deleteQuestion={deleteQuestion}
              duplicateQuestion={duplicateQuestion}
              addOption={addOption}
              updateOption={updateOption}
              removeOption={removeOption}
            />
          ))}
        </div>


        <div className="mt-6">
          <Card className="border-2 border-gray-300 transition-colors">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2">
                {QUESTION_TYPES.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <Button
                      key={type.value}
                      variant="outline"
                      onClick={() => addQuestion(type.value)}
                      className="flex items-center space-x-2"
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{type.label}</span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;