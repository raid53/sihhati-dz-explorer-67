import React, { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Save, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ClinicsManagement: React.FC = () => {
  const { clinics, updateClinic } = useAdmin();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    specialty: '',
    location: '',
    price: '',
    nextAvailable: '',
    phone: '',
    address: '',
    hours: '',
    description: '',
    type: 'clinic' as 'clinic' | 'hospital' | 'center',
  });

  const handleEdit = (clinicId: number) => {
    const clinic = clinics.find(c => c.id === clinicId);
    if (clinic) {
      setEditForm({
        name: clinic.name,
        specialty: clinic.specialty,
        location: clinic.location,
        price: clinic.price,
        nextAvailable: clinic.nextAvailable,
        phone: clinic.phone || '',
        address: clinic.address || '',
        hours: clinic.hours || '',
        description: clinic.description || '',
        type: clinic.type,
      });
      setEditingId(clinicId);
    }
  };

  const handleSave = () => {
    if (!editingId) return;
    
    updateClinic(editingId, editForm);
    setEditingId(null);
    toast({
      title: "تم التحديث بنجاح",
      description: "تم تحديث بيانات العيادة/المستشفى بنجاح",
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({
      name: '',
      specialty: '',
      location: '',
      price: '',
      nextAvailable: '',
      phone: '',
      address: '',
      hours: '',
      description: '',
      type: 'clinic',
    });
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      'clinic': 'عيادة',
      'hospital': 'مستشفى',
      'center': 'مركز'
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>إدارة العيادات والمستشفيات</CardTitle>
        <CardDescription>
          يمكنك تعديل معلومات جميع العيادات والمستشفيات والمراكز الطبية من هنا
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {clinics.map((clinic) => (
            <Card key={clinic.id} className="p-4">
              {editingId === clinic.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor={`name-${clinic.id}`}>اسم العيادة/المستشفى</Label>
                      <Input
                        id={`name-${clinic.id}`}
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="text-right"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`type-${clinic.id}`}>النوع</Label>
                      <Select
                        value={editForm.type}
                        onValueChange={(value: 'clinic' | 'hospital' | 'center') => 
                          setEditForm({ ...editForm, type: value })
                        }
                      >
                        <SelectTrigger className="text-right">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="clinic">عيادة</SelectItem>
                          <SelectItem value="hospital">مستشفى</SelectItem>
                          <SelectItem value="center">مركز طبي</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor={`specialty-${clinic.id}`}>التخصص</Label>
                      <Input
                        id={`specialty-${clinic.id}`}
                        value={editForm.specialty}
                        onChange={(e) => setEditForm({ ...editForm, specialty: e.target.value })}
                        className="text-right"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`location-${clinic.id}`}>الموقع</Label>
                      <Input
                        id={`location-${clinic.id}`}
                        value={editForm.location}
                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                        className="text-right"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`address-${clinic.id}`}>العنوان الكامل</Label>
                      <Input
                        id={`address-${clinic.id}`}
                        value={editForm.address}
                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                        className="text-right"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`phone-${clinic.id}`}>رقم الهاتف</Label>
                      <Input
                        id={`phone-${clinic.id}`}
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="text-right"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`hours-${clinic.id}`}>ساعات العمل</Label>
                      <Input
                        id={`hours-${clinic.id}`}
                        value={editForm.hours}
                        onChange={(e) => setEditForm({ ...editForm, hours: e.target.value })}
                        className="text-right"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`price-${clinic.id}`}>السعر</Label>
                      <Input
                        id={`price-${clinic.id}`}
                        value={editForm.price}
                        onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                        className="text-right"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`nextAvailable-${clinic.id}`}>الموعد القادم</Label>
                      <Input
                        id={`nextAvailable-${clinic.id}`}
                        value={editForm.nextAvailable}
                        onChange={(e) => setEditForm({ ...editForm, nextAvailable: e.target.value })}
                        className="text-right"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor={`description-${clinic.id}`}>الوصف</Label>
                      <Textarea
                        id={`description-${clinic.id}`}
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        className="text-right"
                        rows={3}
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
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{clinic.name}</h3>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {getTypeLabel(clinic.type)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{clinic.specialty}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">الموقع: </span>
                        <span className="text-muted-foreground">{clinic.location}</span>
                      </div>
                      <div>
                        <span className="font-medium">الهاتف: </span>
                        <span className="text-muted-foreground">{clinic.phone || 'غير متوفر'}</span>
                      </div>
                      <div>
                        <span className="font-medium">السعر: </span>
                        <span className="text-muted-foreground">{clinic.price}</span>
                      </div>
                      <div>
                        <span className="font-medium">الموعد القادم: </span>
                        <span className="text-muted-foreground">{clinic.nextAvailable}</span>
                      </div>
                    </div>
                  </div>
                  <Button onClick={() => handleEdit(clinic.id)} variant="ghost" size="sm">
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

export default ClinicsManagement;
