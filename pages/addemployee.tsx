"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router"; // ✅ Pages Router version
import { useToast } from "../hooks/use-toast";

interface Employee {
  name: string;
  email: string;
  department: string;
  position: string;
  phone: string;
  joinDate: string;
  status: "Active" | "Inactive";
}

const AddEmployee = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  // ✅ Safe query usage
  const isEditMode = router.query.edit === "true";
  const encodedEmployee = router.query.data as string;
  const employeeData: Employee | null = encodedEmployee
    ? JSON.parse(decodeURIComponent(encodedEmployee))
    : null;

  const [formData, setFormData] = useState<Employee>({
    name: "",
    email: "",
    department: "",
    position: "",
    phone: "",
    joinDate: "",
    status: "Active",
  });

  useEffect(() => {
    if (isEditMode && employeeData) {
      setFormData(employeeData);
    }
  }, [isEditMode, employeeData]);

  const departments = [
    "Engineering",
    "Production",
    "Quality Control",
    "Administration",
    "Maintenance",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast({
      title: isEditMode ? "Employee Updated" : "Employee Added",
      description: isEditMode
        ? "Employee information has been updated successfully."
        : "New employee has been added successfully.",
    });

    router.push("/employeeportal"); // ✅ lowercased to match deployment
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.push("/employeeportal")}
                className="p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="font-times text-xl font-bold text-gray-800">
                {isEditMode ? "Edit Employee" : "Add New Employee"}
              </h1>
            </div>
            <div className="text-right">
              <p className="font-times text-sm font-medium text-gray-800">{user?.username}</p>
              <p className="font-times text-xs text-gray-500 capitalize">{user?.role} Account</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-times">
              {isEditMode ? "Edit Employee Information" : "Employee Information"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="font-times">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="font-times"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="font-times">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="font-times"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department" className="font-times">
                    Department
                  </Label>
                  <Select
                    value={formData.department}
                    onValueChange={value => setFormData({ ...formData, department: value })}
                  >
                    <SelectTrigger className="font-times">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="position" className="font-times">
                    Position
                  </Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={e => setFormData({ ...formData, position: e.target.value })}
                    required
                    className="font-times"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="font-times">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="font-times"
                  />
                </div>
                <div>
                  <Label htmlFor="joinDate" className="font-times">
                    Join Date
                  </Label>
                  <Input
                    id="joinDate"
                    type="date"
                    value={formData.joinDate}
                    onChange={e => setFormData({ ...formData, joinDate: e.target.value })}
                    required
                    className="font-times"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="status" className="font-times">
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "Active" | "Inactive") =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger className="font-times">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1 font-times">
                  {isEditMode ? "Update Employee" : "Add Employee"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/employeeportal")}
                  className="font-times"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AddEmployee;
