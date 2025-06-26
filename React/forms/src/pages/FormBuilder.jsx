import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForms } from '../contexts/FormsContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

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
  
  const [formData, setFormData] = useState({
    title: 'Untitled form',
    description: '',
    questions: []
  });
  
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (formId) {
      const existingForm = forms.find(form => form.id === formId);
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
    } else {
      const newFormId = createForm(formData);
      navigate(`/edit/${newFormId}`);
    }
  };

  const handlePreview = () => {
    if (isEditing) {
      navigate(`/form/${formId}`);
    } else {
      const newFormId = createForm(formData);
      navigate(`/form/${newFormId}`);
    }
  };

  const QuestionEditor = ({ question }) => {
    const [questionTitle, setQuestionTitle] = useState(question.title);
    const [optionValues, setOptionValues] = useState(question.options);

    useEffect(() => {
      setQuestionTitle(question.title);
    }, [question.title]);

    useEffect(() => {
      setOptionValues(question.options);
    }, [question.options]);

    const handleTitleChange = (e) => {
      setQuestionTitle(e.target.value);
    };

    const handleTitleBlur = () => {
      updateQuestion(question.id, { title: questionTitle });
    };

    const handleTitleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.target.blur();
      }
    };

    const handleOptionChange = (e, index) => {
      const newOptionValues = [...optionValues];
      newOptionValues[index] = e.target.value;
      setOptionValues(newOptionValues);
    };

    const handleOptionBlur = (index) => {
      updateOption(question.id, index, optionValues[index]);
    };

    const handleOptionKeyDown = (e, index) => {
      if (e.key === 'Enter') {
        e.target.blur();
      }
    };

    const questionType = QUESTION_TYPES.find(type => type.value === question.type);
    const IconComponent = questionType?.icon || Type;

    return (
      <Card className={`mb-4 ${activeQuestion === question.id ? 'ring-2 ring-purple-500' : ''}`}>
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-2 mb-4">
            <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
            <IconComponent className="w-5 h-5 text-gray-600" />
            <Input
              value={questionTitle}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              onKeyDown={handleTitleKeyDown}
              className="text-lg font-medium border-none shadow-none p-0 focus-visible:ring-0"
              placeholder="Question title"
              onClick={() => setActiveQuestion(question.id)}
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <Select
              value={question.type}
              onValueChange={(value) => {
                const newOptions = value === 'multiple-choice' || value === 'checkboxes' || value === 'dropdown'
                  ? ['Option 1']
                  : [];
                updateQuestion(question.id, { type: value, options: newOptions });
              }}
            >
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {QUESTION_TYPES.map((type) => {
                  const IconComp = type.icon;
                  return (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center space-x-2">
                        <IconComp className="w-4 h-4" />
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          {(question.type === 'multiple-choice' || question.type === 'checkboxes' || question.type === 'dropdown') && (
            <div className="space-y-2 mb-4">
              {optionValues.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  {question.type === 'multiple-choice' && <Circle className="w-4 h-4 text-gray-400" />}
                  {question.type === 'checkboxes' && <CheckSquare className="w-4 h-4 text-gray-400" />}
                  {question.type === 'dropdown' && <span className="text-gray-400 text-sm">{index + 1}.</span>}
                  <Input
                    value={option}
                    onChange={(e) => handleOptionChange(e, index)}
                    onBlur={() => handleOptionBlur(index)}
                    onKeyDown={(e) => handleOptionKeyDown(e, index)}
                    className="flex-1"
                    placeholder={`Option ${index + 1}`}
                  />
                  {optionValues.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeOption(question.id, index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addOption(question.id)}
                className="text-purple-600 hover:text-purple-700"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add option
              </Button>
            </div>
          )}

          {question.type === 'text' && (
            <Input placeholder="Short answer text" disabled className="mb-4" />
          )}
          
          {question.type === 'paragraph' && (
            <Textarea placeholder="Long answer text" disabled className="mb-4" />
          )}
          
          {question.type === 'date' && (
            <Input type="date" disabled className="mb-4 w-48" />
          )}
          
          {question.type === 'time' && (
            <Input type="time" disabled className="mb-4 w-48" />
          )}

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => duplicateQuestion(question.id)}
              >
                <Copy className="w-4 h-4 mr-1" />
                Duplicate
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteQuestion(question.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Label htmlFor={`required-${question.id}`} className="text-sm">
                Required
              </Label>
              <Switch
                id={`required-${question.id}`}
                checked={question.required}
                onCheckedChange={(checked) => updateQuestion(question.id, { required: checked })}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Forms
              </Button>
              <div 
                className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center cursor-pointer"
                onClick={() => navigate('/')}
              >
                <FileText className="w-5 h-5 text-white" />
              </div>
              <Input
                value={formData.title}
                onChange={(e) => handleFormTitleChange(e.target.value)}
                className="text-lg font-semibold border-none shadow-none p-0 focus-visible:ring-0 max-w-md"
                placeholder="Form title"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handlePreview}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-6">
          <CardContent className="p-6">
            <Input
              value={formData.title}
              onChange={(e) => handleFormTitleChange(e.target.value)}
              className="text-2xl font-bold border-none shadow-none p-0 focus-visible:ring-0 mb-4"
              placeholder="Form title"
            />
            <Textarea
              value={formData.description}
              onChange={(e) => handleFormDescriptionChange(e.target.value)}
              className="border-none shadow-none p-0 focus-visible:ring-0 resize-none"
              placeholder="Form description"
              rows={2}
            />
          </CardContent>
        </Card>

        <div className="space-y-4">
          {formData.questions.map((question) => (
            <QuestionEditor key={question.id} question={question} />
          ))}
        </div>

        <div className="mt-6">
          <Card className="border-2 border-dashed border-gray-300 hover:border-purple-400 transition-colors">
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