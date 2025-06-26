import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForms } from '../contexts/FormsContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, FileText, Users, Calendar, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const FormsList = () => {
  const navigate = useNavigate();
  const { forms, deleteForm, getFormResponses } = useForms();

  const handleCreateForm = () => {
    navigate('/create');
  };

  const handleEditForm = (formId) => {
    navigate(`/edit/${formId}`);
  };

  const handleViewForm = (formId) => {
    navigate(`/form/${formId}`);
  };

  const handleViewResponses = (formId) => {
    navigate(`/responses/${formId}`);
  };

  const handleDeleteForm = (formId) => {
    if (window.confirm('Are you sure you want to delete this form?')) {
      deleteForm(formId);
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Forms</h1>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Start a new form</h2>
          <div className="flex space-x-4">
            <Card 
              className="w-48 h-32 cursor-pointer hover:shadow-md transition-shadow border-2 border-dashed border-gray-300 hover:border-purple-400"
              onClick={handleCreateForm}
            >
              <CardContent className="flex flex-col items-center justify-center h-full">
                <Plus className="w-8 h-8 text-purple-600 mb-2" />
                <span className="text-sm font-medium text-gray-700">Blank form</span>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent forms</h2>
          {forms.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No forms yet</h3>
              <p className="text-gray-500 mb-4">Create your first form to get started</p>
              <Button onClick={handleCreateForm}>
                <Plus className="w-4 h-4 mr-2" />
                Create Form
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {forms.map((form) => {
                const responseCount = getFormResponses(form.id).length;
                return (
                  <Card 
                    key={form.id} 
                    className="hover:shadow-lg transition-shadow cursor-pointer group"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <CardTitle 
                            className="text-lg font-semibold text-gray-900 truncate group-hover:text-purple-600 transition-colors"
                            onClick={() => handleViewForm(form.id)}
                          >
                            {form.title}
                          </CardTitle>
                          <CardDescription className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {form.description || 'No description'}
                          </CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewForm(form.id)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Form
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditForm(form.id)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleViewResponses(form.id)}>
                              <Users className="w-4 h-4 mr-2" />
                              View Responses ({responseCount})
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteForm(form.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(form.createdAt)}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {responseCount} responses
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleViewForm(form.id)}
                          className="flex-1"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => handleEditForm(form.id)}
                          className="flex-1"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormsList;