import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LeaveService, LeaveItem } from '../services/leave.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-leave',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css'],
})
export class LeaveComponent implements OnInit {
  private leaveService = inject(LeaveService);
  private authService = inject(AuthService);
  private router = inject(Router);

  employeeId = this.authService.getEmployeeId() ?? '';
  leaves = signal<LeaveItem[]>([]);
  error = signal<string>('');
  loading = signal<boolean>(true);

  ngOnInit(): void {
    if (!this.employeeId) {
      this.error.set('No employee ID found. Please login again.');
      this.loading.set(false);
      return;
    }

    this.leaveService.fetchLeaves(this.employeeId).subscribe({
      next: (res) => {
        this.leaves.set(res.leaveData?.filter(l => l) ?? []);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err?.error?.message || 'Failed to load leaves.');
        this.loading.set(false);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  /** Returns a human-readable leave type label */
  getLabel(leave: LeaveItem): string {
    return this.getLeaveTypeLabel(leave.SUBTYPE, leave.ABSENCE_QUOTA_TYPE);
  }

  /** Returns the leave status based on leave data */
  getStatus(leave: LeaveItem): string {
    if (leave.ABWTG && parseFloat(leave.ABWTG) > 0) return 'Approved';
    if (leave.APPLY_DATE && leave.APPLY_DATE !== '0000-00-00') return 'Applied';
    return 'Info';
  }

  /** Returns the icon name for the given leave */
  getIcon(leave: LeaveItem): string {
    const type = this.getLabel(leave).toLowerCase();
    if (type.includes('casual')) return 'event_available';
    if (type.includes('sick')) return 'sick';
    if (type.includes('education')) return 'school';
    if (type.includes('earned')) return 'star';
    return 'calendar_today';
  }

  /** Helper: maps subtype/quotaType to user-friendly label */
  private getLeaveTypeLabel(subtype: string, quotaType: string): string {
    if (quotaType && quotaType.trim()) {
      return quotaType;
    }

    switch (subtype) {
      case '0300': return 'Casual Leave';
      case '0720': return 'Sick Leave';
      case '0810': return 'Earned Leave';
      default: return 'Leave';
    }
  }
}
