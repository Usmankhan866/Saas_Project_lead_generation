"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, ExternalLink } from "lucide-react"
import type { Lead } from "@/lib/types"

interface DataTableProps {
  data: Lead[]
  selectedIds: string[]
  onSelect: (id: string) => void
  onSelectAll: (selected: boolean) => void
  onEdit: (lead: Lead) => void
  onDelete: (id: string) => void
  onExport?: (leads: Lead[]) => void
}

export function DataTable({ data, selectedIds, onSelect, onSelectAll, onEdit, onDelete, onExport }: DataTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<Lead>>({})

  const isAllSelected = data.length > 0 && selectedIds.length === data.length
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < data.length

  const handleEdit = (lead: Lead) => {
    setEditingId(lead.id)
    setEditData(lead)
  }

  const handleSave = () => {
    if (editingId && editData) {
      onEdit({ ...editData, id: editingId } as Lead)
      setEditingId(null)
      setEditData({})
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditData({})
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={isAllSelected}
            onCheckedChange={onSelectAll}
            ref={(ref) => {
              if (ref) ref.indeterminate = isIndeterminate
            }}
          />
          <span className="text-sm text-gray-600">
            {selectedIds.length} of {data.length} selected
          </span>
        </div>
        {selectedIds.length > 0 && onExport && (
          <Button variant="outline" onClick={() => onExport(data.filter((lead) => selectedIds.includes(lead.id)))}>
            <ExternalLink className="mr-2 h-4 w-4" />
            Export Selected
          </Button>
        )}
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Select</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>
                  <Checkbox checked={selectedIds.includes(lead.id)} onCheckedChange={() => onSelect(lead.id)} />
                </TableCell>
                <TableCell>
                  {editingId === lead.id ? (
                    <Input
                      value={editData.name || ""}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full"
                    />
                  ) : (
                    <div>
                      <div className="font-medium">{lead.name}</div>
                      {lead.website && (
                        <a
                          href={`https://${lead.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          {lead.website}
                        </a>
                      )}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === lead.id ? (
                    <div className="space-y-2">
                      <Input
                        value={editData.email || ""}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        placeholder="Email"
                      />
                      <Input
                        value={editData.phone || ""}
                        onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                        placeholder="Phone"
                      />
                    </div>
                  ) : (
                    <div>
                      {lead.email && <div className="text-sm">{lead.email}</div>}
                      {lead.phone && <div className="text-sm text-gray-600">{lead.phone}</div>}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === lead.id ? (
                    <Input
                      value={editData.location || ""}
                      onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                    />
                  ) : (
                    lead.location
                  )}
                </TableCell>
                <TableCell>
                  {editingId === lead.id ? (
                    <Input
                      value={editData.industry || ""}
                      onChange={(e) => setEditData({ ...editData, industry: e.target.value })}
                    />
                  ) : (
                    <Badge variant="secondary">{lead.industry}</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {lead.rating && (
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1">{lead.rating}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {editingId === lead.id ? (
                      <>
                        <Button size="sm" onClick={handleSave}>
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCancel}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" variant="outline" onClick={() => handleEdit(lead)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => onDelete(lead.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
