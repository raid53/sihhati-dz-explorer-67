import React, { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit, Save, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const DoctorManagement: React.FC = () => {
  const { doctors, updateDoctor } = useAdmin();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    specialty: '',
    experience: '',
    location: '',
    price: '',
    nextAvailable: '',
  });

  const handleEdit = (doctorId: number) => {
    const doctor = doctors.find(d => d.id === doctorId);
    if (doctor) {
      setEditForm({
        name: doctor.name,
        specialty: doctor.specialty,
        experience: doctor.experience,
        location: doctor.location,
        price: doctor.price,
        nextAvailable: doctor.nextAvailable,
      });
      setEditingId(doctorId);
    }
  };

  const handleSave = () => {
    if (!editingId) return;
    
    updateDoctor(editingId, editForm);
    setEditingId(null);
    toast({
      title: "تم التحديث بنجاح",
      description: "تم تحديث بيانات الطبيب بنجاح",
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({
      name: '',
      specialty: '',
      experience: '',
      location: '',
      price: '',
      nextAvailable: '',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>إدارة الأطباء</CardTitle>
        <CardDescription>
          يمكنك تعديل معلومات الأطباء من هنا
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="p-4">
              {editingId === doctor.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`name-${doctor.id}`}>الاسم</Label>
                      <Input
                        id={`name-${doctor.id}`}
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="text-right"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`specialty-${doctor.id}`}>التخصص</Label>
                      <Input
                        id={`specialty-${doctor.id}`}
                        value={editForm.specialty}
                        onChange={(e) => setEditForm({ ...editForm, specialty: e.target.value })}
                        className="text-right"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`experience-${doctor.id}`}>سنوات الخبرة</Label>
                      <Input
                        id={`experience-${doctor.id}`}
                        value={editForm.experience}
                        onChange={(e) => setEditForm({ ...editForm, experience: e.target.value })}
                        className="text-right"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`location-${doctor.id}`}>الموقع</Label>
                      <Input
                        id={`location-${doctor.id}`}
                        value={editForm.location}
                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                        className="text-right"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`price-${doctor.id}`}>السعر</Label>
                      <Input
                        id={`price-${doctor.id}`}
                        value={editForm.price}
                        onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                        className="text-right"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`nextAvailable-${doctor.id}`}>الموعد القادم</Label>
                      <Input
                        id={`nextAvailable-${doctor.id}`}
                        value={editForm.nextAvailable}
                        onChange={(e) => setEditForm({ ...editForm, nextAvailable: e.target.value })}
                        className="text-right"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button onClick={handleSave} size="sm">
                      <Save className="w-4 h-4 ml-2" />
                      حفظ
                    </Button>
                    <Button onClick={handleCancel} variant="outline" size="sm">
                      <X className="w-4 h-4 ml-2" />
                      إلغاء
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div className="space-y-2 text-right flex-1">
                    <h3 className="font-semibold text-lg">{doctor.name}</h3>
                    <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">الخبرة: </span>
                        <span className="text-muted-foreground">{doctor.experience}</span>
                      </div>
                      <div>
                        <span className="font-medium">الموقع: </span>
                        <span className="text-muted-foreground">{doctor.location}</span>
                      </div>
                      <div>
                        <span className="font-medium">السعر: </span>
                        <span className="text-muted-foreground">{doctor.price}</span>
                      </div>
                      <div>
                        <span className="font-medium">الموعد القادم: </span>
                        <span className="text-muted-foreground">{doctor.nextAvailable}</span>
                      </div>
                    </div>
                  </div>
                  <Button onClick={() => handleEdit(doctor.id)} variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorManagement;
