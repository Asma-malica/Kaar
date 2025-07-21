import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RfqService } from '../services/rfq.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-rfq',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatCardModule, MatIconModule],
  templateUrl: './rfq.component.html',
  styleUrl: './rfq.component.css'
})
export class RfqComponent implements OnInit {
  rfqList: any[] = [];
  vendorId: string = '';

  constructor(private rfqService: RfqService, private authService: AuthService) {}

  ngOnInit() {
    this.vendorId = this.authService.getVendorId() || '';
    if (this.vendorId) {
      this.rfqService.getRfqData(this.vendorId).subscribe({
        next: (res) => {
          this.rfqList = res.data || [];
        },
        error: (err) => {
          console.error('Error fetching RFQs', err);
        }
      });
    }
  }

  parseDate(odataDate: string): string {
    if (!odataDate) return 'N/A';
    const timestamp = parseInt(odataDate.replace('/Date(', '').replace(')/', ''), 10);
    return new Date(timestamp).toLocaleDateString();
  }

  parseSAPDate(sapDate: string): string {
  const timestamp = parseInt(sapDate.replace(/[^0-9]/g, ''), 10);
  const date = new Date(timestamp);
  return date.toLocaleDateString();  // Or format as needed
}

}
