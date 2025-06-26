import React, { useEffect, useState } from 'react';
import { Input } from '@/atoms/input';
import { Textarea } from '@/atoms/textarea';
import { Button } from '@/atoms/button';
import { Switch } from '@/atoms/switch';
import { Label } from '@/atoms/label';
import { Card, CardContent, CardHeader } from '@/molecules/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/molecules/select';
import {
  GripVertical, Trash2, Plus, Copy,
  CheckSquare, Circle, Type, AlignLeft, List, Calendar, Clock
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

const QuestionEditor = ({
  question,
  activeQuestion,
  setActiveQuestion,
  updateQuestion,
  deleteQuestion,
  duplicateQuestion,
  addOption,
  updateOption,
  removeOption
}) => {
  const [questionTitle, setQuestionTitle] = useState(question.title);
  const [optionValues, setOptionValues] = useState(question.options);

  useEffect(() => {
    setQuestionTitle(question.title);
  }, [question.title]);

  useEffect(() => {
    setOptionValues(question.options);
  }, [question.options]);

  const IconComponent = QUESTION_TYPES.find(t => t.value === question.type)?.icon || Type;

  return (
    <Card className={`mb-4 ${activeQuestion === question.id ? 'ring-2 ring-purple-700' : ''}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-2 mb-4">
          <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
          <IconComponent className="w-5 h-5 text-gray-600" />
          <Input
            value={questionTitle}
            onChange={(e) => setQuestionTitle(e.target.value)}
            onBlur={() => updateQuestion(question.id, { title: questionTitle })}
            onKeyDown={(e) => e.key === 'Enter' && e.target.blur()}
            onClick={() => setActiveQuestion(question.id)}
            className="text-lg font-medium border-none shadow-none p-0 focus-visible:ring-0"
            placeholder="Question title"
          />
        </div>

        <Select
          value={question.type}
          onValueChange={(value) => {
            const newOptions = ['multiple-choice', 'checkboxes', 'dropdown'].includes(value)
              ? ['Option 1'] : [];
            updateQuestion(question.id, { type: value, options: newOptions });
          }}
        >
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {QUESTION_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                <div className="flex items-center space-x-2">
                  <type.icon className="w-4 h-4" />
                  <span>{type.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        {['multiple-choice', 'checkboxes', 'dropdown'].includes(question.type) && (
          <div className="space-y-2 mb-4">
            {optionValues.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                {question.type === 'multiple-choice' && <Circle className="w-4 h-4 text-gray-400" />}
                {question.type === 'checkboxes' && <CheckSquare className="w-4 h-4 text-gray-400" />}
                {question.type === 'dropdown' && <span className="text-gray-400 text-sm">{index + 1}.</span>}
                <Input
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...optionValues];
                    newOptions[index] = e.target.value;
                    setOptionValues(newOptions);
                  }}
                  onBlur={() => updateOption(question.id, index, optionValues[index])}
                  onKeyDown={(e) => e.key === 'Enter' && e.target.blur()}
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
            <Label htmlFor={`required-${question.id}`} className="text-sm">Required</Label>
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

export default QuestionEditor;