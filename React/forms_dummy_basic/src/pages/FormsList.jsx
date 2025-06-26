import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForms } from '@/contexts/FormsContext';
import { Button } from '@/atoms/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/molecules/card';
import { Plus, FileText, Users, Calendar, MoreVertical, Eye, Edit, Search } from 'lucide-react';
import Navbar from '@/organisms/NavBar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/molecules/dropdown-menu';

const FormsList = () => {
  const navigate = useNavigate();
  const { forms, deleteForm, getFormResponses } = useForms();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredForms, setFilteredForms] = useState(forms);
  const [activeIndex, setActiveIndex] = useState(0);

  const modalRef = useRef(null);

  const handleCreateForm = () => navigate('/create');
  const handleEditForm = (formId) => navigate(`/edit/${formId}`);
  const handleViewForm = (formId) => navigate(`/form/${formId}`);
  const handleViewResponses = (formId) => navigate(`/responses/${formId}`);
  const handleDeleteForm = (formId) => {
    if (window.confirm('Are you sure you want to delete this form?')) {
      deleteForm(formId);
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  };

  const handleGlobalKeyDown = useCallback((e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      setSearchOpen(true);
      setSearchQuery('');
      setFilteredForms(forms);
    } else if (e.key === 'Escape') {
      setSearchOpen(false);
    }
  }, [forms]);

  useEffect(() => {
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [handleGlobalKeyDown]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredForms(forms);
      return;
    }

    const q = searchQuery.toLowerCase();
    const matched = forms.filter(f =>
      f.title.toLowerCase().includes(q) ||
      (f.description && f.description.toLowerCase().includes(q))
    );

    setFilteredForms(matched);
    setActiveIndex(0);
  }, [searchQuery, forms]);

  const handleResultKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredForms.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filteredForms.length) % filteredForms.length);
    } else if (e.key === 'Enter') {
      if (filteredForms[activeIndex]) {
        handleViewForm(filteredForms[activeIndex].id);
        setSearchOpen(false);
      }
    }
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setSearchOpen(false);
    }
  };

  useEffect(() => {
    if (searchOpen) {
      window.addEventListener('mousedown', handleClickOutside);
    } else {
      window.removeEventListener('mousedown', handleClickOutside);
    }
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [searchOpen]);

  return (
    <div className="">
      <Navbar />

      {searchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-start justify-center pt-20 px-4">
          <div
            ref={modalRef}
            className="bg-white w-full max-w-lg rounded-xl shadow-lg p-4"
          >

            <input
              autoFocus
              onKeyDown={handleResultKeyDown}
              className="w-full border px-3 py-2 rounded mb-4 text-sm outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Search forms (Cmd/Ctrl + K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredForms.length === 0 ? (
                <p className="text-sm text-gray-500 text-center">No matching forms found.</p>
              ) : (
                filteredForms.map((form, idx) => (
                  <div
                    key={form.id}
                    onClick={() => {
                      handleViewForm(form.id);
                      setSearchOpen(false);
                    }}
                    className={`cursor-pointer border px-4 py-2 rounded hover:bg-purple-50 ${
                      idx === activeIndex ? 'bg-purple-100' : ''
                    }`}
                  >
                    <div className="font-medium text-gray-800 truncate">{form.title}</div>
                    <div className="text-sm text-gray-500 truncate">
                      {form.description || 'No description'}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-end items-center mb-6">
          <input
            onClick={() => {
              setSearchOpen(true);
              setSearchQuery('');
              setFilteredForms(forms);
            }}
            readOnly
            placeholder="Search forms... (Cmd/Ctrl + K)"
            className="w-72 border rounded px-3 py-2 text-sm cursor-pointer text-gray-600 bg-gray-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Start a new form</h2>
          <div className="flex space-x-4 justify-center">
            <Card
              className="w-48 h-32 cursor-pointer hover:shadow-md transition-shadow border-2 border-gray-300 hover:border-purple-400"
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
                            className="flex justify-start text-lg font-semibold text-gray-900 truncate group-hover:text-purple-600 transition-colors"
                            onClick={() => handleViewForm(form.id)}
                          >
                            {form.title}
                          </CardTitle>
                          <CardDescription className="flex text-start justify-start text-sm text-gray-500 mt-1 line-clamp-2">
                            {form.description || 'No description'}
                          </CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewForm(form.id)}>
                              View Form
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditForm(form.id)}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleViewResponses(form.id)}>
                              View Responses ({responseCount})
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteForm(form.id)}
                              className="text-red-600 hover:text-red-700"
                            >
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
                        <Button size="sm" onClick={() => handleEditForm(form.id)} className="flex-1">
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